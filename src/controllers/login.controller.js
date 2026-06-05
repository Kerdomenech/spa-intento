import renderRoute from "../router/routes.js"
import { loginUser } from "../services/loginUser.js"

export async function login() {
  const form = document.getElementById("loginForm")

  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value.trim()
    const errorMsg = document.getElementById("error-msg")

    if (!email || !password) {
      errorMsg.textContent = "Todos los campos son requeridos"
      errorMsg.classList.remove("hidden")
      return
    }
    
  const user = await loginUser(email, password)
    

    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
      window.history.pushState({},"","/dashboard")
      renderRoute()
    } else {
      errorMsg.textContent = "Email o contraseña incorrectos"
      errorMsg.classList.remove("hidden")
    }
  })
}
