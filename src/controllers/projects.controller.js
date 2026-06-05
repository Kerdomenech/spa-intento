import {
  getProjects, getProjectsByUser,
  createProject, updateProject,
  deleteProject, patchProjectStatus
} from "../services/api.js"

export async function projects() {
  const user = JSON.parse(localStorage.getItem("user"))
  const list = user.role === "manager"
    ? await getProjects()
    : await getProjectsByUser(user.id)

  renderProjects(list, user)
}

function renderProjects(list, user) {
  const isManager = user.role === "manager"

  const cards = list.map(p => `
    <div class="bg-white rounded-xl shadow p-5">
      <div class="flex justify-between items-start">
        <h3 class="font-bold text-lg">${p.name}</h3>
        <span class="text-xs px-2 py-1 rounded-full ${statusColor(p.status)}">${p.status}</span>
      </div>
      <p class="text-gray-500 text-sm mt-1">${p.description}</p>
      <p class="text-xs text-gray-400 mt-2">Created: ${p.createdAt}</p>
      <div class="flex gap-2 mt-4">
        ${isManager ? `
          <button class="btn-edit bg-yellow-400 px-3 py-1 rounded text-sm" data-id="${p.id}">Edit</button>
          <button class="btn-delete bg-red-500 text-white px-3 py-1 rounded text-sm" data-id="${p.id}">Delete</button>
        ` : `
          <button class="btn-status bg-green-500 text-white px-3 py-1 rounded text-sm" data-id="${p.id}">Update Status</button>
        `}
      </div>
    </div>`
  ).join("")

  document.getElementById("principal_content").innerHTML = `
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Projects</h1>
      ${isManager ? `<button id="btn-new" class="bg-indigo-500 text-white px-4 py-2 rounded-lg">+ New Project</button>` : ""}
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">${cards}</div>
    <div id="modal"></div>`

  // Eventos
  document.getElementById("btn-new")?.addEventListener("click", () => showModal(null, list, user))

  document.querySelectorAll(".btn-edit").forEach(btn =>
    btn.addEventListener("click", () => {
      const project = list.find(p => p.id === btn.dataset.id)
      showModal(project, list, user)
    })
  )

  document.querySelectorAll(".btn-delete").forEach(btn =>
    btn.addEventListener("click", async () => {
      if (confirm("¿Eliminar este proyecto?")) {
        await deleteProject(btn.dataset.id)
        projects()
      }
    })
  )

  document.querySelectorAll(".btn-status").forEach(btn =>
    btn.addEventListener("click", () => showStatusModal(btn.dataset.id, list, user))
  )
}

function showModal(project, list, user) {
  const isEdit = !!project
  document.getElementById("modal").innerHTML = `
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-10">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h2 class="text-xl font-bold mb-4">${isEdit ? "Edit" : "New"} Project</h2>
        <input id="p-name" class="border w-full p-2 rounded mb-3" placeholder="Name" value="${project?.name || ""}">
        <textarea id="p-desc" class="border w-full p-2 rounded mb-3" placeholder="Description">${project?.description || ""}</textarea>
        <select id="p-status" class="border w-full p-2 rounded mb-3">
          <option ${project?.status === "Pending" ? "selected" : ""}>Pending</option>
          <option ${project?.status === "In Progress" ? "selected" : ""}>In Progress</option>
          <option ${project?.status === "Done" ? "selected" : ""}>Done</option>
        </select>
        <input id="p-assigned" class="border w-full p-2 rounded mb-4" placeholder="Assigned To (user id)" value="${project?.assignedTo || ""}">
        <div class="flex gap-3 justify-end">
          <button id="btn-cancel" class="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button id="btn-save" class="px-4 py-2 bg-indigo-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>`

  document.getElementById("btn-cancel").addEventListener("click", () => {
    document.getElementById("modal").innerHTML = ""
  })

  document.getElementById("btn-save").addEventListener("click", async () => {
    const data = {
      name: document.getElementById("p-name").value,
      description: document.getElementById("p-desc").value,
      status: document.getElementById("p-status").value,
      assignedTo: document.getElementById("p-assigned").value,
      createdAt: project?.createdAt || new Date().toISOString().split("T")[0]
    }
    if (isEdit) await updateProject(project.id, data)
    else await createProject(data)
    projects()
  })
}

function showStatusModal(id, list, user) {
  document.getElementById("modal").innerHTML = `
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-10">
      <div class="bg-white rounded-2xl p-6 w-80 shadow-xl">
        <h2 class="text-xl font-bold mb-4">Update Status</h2>
        <select id="new-status" class="border w-full p-2 rounded mb-4">
          <option>Pending</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <div class="flex gap-3 justify-end">
          <button id="btn-cancel" class="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button id="btn-save-status" class="px-4 py-2 bg-green-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>`

  document.getElementById("btn-cancel").addEventListener("click", () => {
    document.getElementById("modal").innerHTML = ""
  })

  document.getElementById("btn-save-status").addEventListener("click", async () => {
    const status = document.getElementById("new-status").value
    await patchProjectStatus(id, status)
    projects()
  })
}

function statusColor(status) {
  if (status === "In Progress") return "bg-blue-100 text-blue-700"
  if (status === "Done") return "bg-green-100 text-green-700"
  return "bg-yellow-100 text-yellow-700"
}