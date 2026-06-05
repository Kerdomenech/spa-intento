export default function layout() {
  const user = JSON.parse(localStorage.getItem("user"))

  return `
    <header class="flex justify-between items-center bg-indigo-600 px-6 py-3">
      <span class="text-white font-bold text-lg">ProjectManager</span>
      <div class="flex items-center gap-3">
        <span class="text-indigo-200 text-sm">${user?.name} — ${user?.role}</span>
        <button id="btn-logout" class="bg-white text-indigo-600 px-3 py-1 rounded text-sm font-medium">
          Logout
        </button>
      </div>
    </header>
    <section class="flex min-h-screen">
      <aside class="bg-sky-700 w-48 py-6 px-3 flex flex-col gap-2">
        <a href="/dashboard" class="text-white px-3 py-2 rounded hover:bg-sky-600">Dashboard</a>
        <a href="/projects" class="text-white px-3 py-2 rounded hover:bg-sky-600">Projects</a>
      </aside>
      <main id="principal_content" class="flex-1 bg-gray-100 p-6"></main>
    </section>`
}