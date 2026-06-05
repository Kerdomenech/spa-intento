import { getProjects, getProjectsByUser } from "../services/api.js"

export async function dashboard() {
  const user = JSON.parse(localStorage.getItem("user"))
  const projects = user.role === "manager"
    ? await getProjects()
    : await getProjectsByUser(user.id)

  const total = projects.length
  const active = projects.filter(p => p.status === "In Progress").length
  const done = projects.filter(p => p.status === "Done").length
  const pending = projects.filter(p => p.status === "Pending").length

  document.getElementById("principal_content").innerHTML = `
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-5 shadow">
        <p class="text-gray-500 text-sm">Total</p>
        <p class="text-4xl font-bold text-indigo-600">${total}</p>
      </div>
      <div class="bg-white rounded-xl p-5 shadow">
        <p class="text-gray-500 text-sm">In Progress</p>
        <p class="text-4xl font-bold text-blue-500">${active}</p>
      </div>
      <div class="bg-white rounded-xl p-5 shadow">
        <p class="text-gray-500 text-sm">Done</p>
        <p class="text-4xl font-bold text-green-500">${done}</p>
      </div>
      <div class="bg-white rounded-xl p-5 shadow">
        <p class="text-gray-500 text-sm">Pending</p>
        <p class="text-4xl font-bold text-yellow-500">${pending}</p>
      </div>
    </div>`
}