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
    window.history.pushState({}, "", "/login")
    renderRoute()
    return
  }

  // Ya logueado intentando ir a /login → redirige al dashboard
  if (user && path === "/login") {
    window.history.pushState({}, "", "/dashboard")
    renderRoute()
    return
  }

  // Ruta no encontrada
  if (!route) {
    container.innerHTML = notFound()
    return
  }

  // Rol insuficiente → redirige al dashboard
  if (route.role && user?.role !== route.role) {
    window.history.pushState({}, "", "/dashboard")
    renderRoute()
    return
  }

  // Ruta pública (login) — sin layout
  if (route.public) {
    container.innerHTML = route.view()
    await route.controller()
    return
  }

  container.innerHTML = layout()

  if (route.controller) {
    await route.controller()
  }

  // Logout
  document.getElementById("btn-logout")?.addEventListener("click", () => {
    localStorage.removeItem("user")
    window.history.pushState({}, "", "/login")
    renderRoute()
  })

  // Interceptar clicks en links SPA
  document.querySelectorAll(".spa-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      window.history.pushState({}, "", link.href)
      renderRoute()
    })
  })
}