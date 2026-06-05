import loginView from "../views/loginView.js"
import dashboardView from "../views/dashboardView.js"
import projectsView from "../views/projectsView.js"
import notFound from "../views/notFound.js"
import { login } from "../controllers/login.controller.js"
import { dashboard } from "../controllers/dashboard.controller.js"
import { projects } from "../controllers/projects.controller.js"
import layout from "../components/layout.js"

const routes = {
  "/login": {
    view: loginView,
    controller: login,
    public: true
  },
  "/dashboard": {
    view: dashboardView,
    controller: dashboard
  },
  "/projects": {
    view: projectsView,
    controller: projects,
    role: "manager"
  }
}

export default async function renderRoute() {
  const container = document.getElementById("app")
  const user = JSON.parse(localStorage.getItem("user"))
  const path = window.location.pathname

  const route = routes[path]

 // Sin sesión → redirige a login
  if (!user && !route?.public) {
    window.history.pushState({}, "", "/login") // Cambio limpio sin recargar
    renderRoute()
    return
  }

  // Ya logueado intentando ir a /login → redirige al dashboard
  if (user && path === "/login") {
    window.history.pushState({}, "", "/dashboard") // Cambio limpio sin recargar
    renderRoute()
    return
  }

  // Ruta no encontrada
  if (!route) {
    container.innerHTML = notFound()
    return
  }

  // Ruta pública (login) — sin layout
  if (route.public) {
    container.innerHTML = route.view()
    await route.controller()
    return
  }

 
  container.innerHTML = layout() // 1. Pintamos el cascarón (Header, Sidebar y contenedor principal)

  // 2. ¡La pieza faltante!: Ejecutamos el controlador de la ruta actual 
  //    para que llene el '#principal_content'.
  if (route.controller) {
    await route.controller()
  }

  // Configuración del botón de Logout que ya tenías
  document.getElementById("btn-logout")?.addEventListener("click", () => {
    localStorage.removeItem("user")
    window.history.pushState({}, "", "/login")
    renderRoute()
  })

  // Interceptar clicks en links SPA para no recargar la página
document.querySelectorAll(".spa-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    window.history.pushState({}, "", link.href)
    renderRoute()
  })
})
}