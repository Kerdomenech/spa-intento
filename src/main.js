import './style.css'
import renderRoute from './router/routes.js'

document.addEventListener("DOMContentLoaded", renderRoute)

// Necesario para que el router funcione al navegar con el historial
window.addEventListener("popstate", renderRoute)