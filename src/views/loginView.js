/* 
  Define la estructura HTML del Login como un string de JavaScript (Template Literal).
  fondo: Usa un degradado oscuro (Slate/Indigo) que aporta profundidad y profesionalismo.
  Tarjeta: Aplica un blanco semitransparente con desenfoque de fondo (backdrop-blur).
  Título: Implementa un degradado de texto moderno en tonos Violeta e Índigo.
  Formularios: Inputs estilizados con transiciones suaves y anillos de enfoque (focus rings).
  Botón: Cuenta con un efecto de pulsación física (active:scale-95) y sombra brillante.
    */

export default function loginView() {
    return `
    <div class="min-h-screen w-full grid place-items-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950">
      <div class="bg-white/95 backdrop-blur-sm p-10 rounded-3xl shadow-2xl w-[400px] border border-white/20">
        
        <div class="text-center mb-8">
          <h1 class="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-500">
            Project Manager
          </h1>
          <p class="text-slate-500 text-sm mt-2">Bienvenido, ingresa a tu cuenta</p>
        </div>

        <form id="loginForm" class="flex flex-col gap-5">
          <div class="group">
            <label class="text-xs font-semibold text-slate-700 uppercase tracking-wider ml-1">Email</label>
            <input type="email" id="email" placeholder="nombre@empresa.com"
              class="w-full border-slate-200 border-2 rounded-xl p-3 mt-1 outline-none transition-all duration-300 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 placeholder:text-slate-400">
          </div>

          <div class="group">
            <label class="text-xs font-semibold text-slate-700 uppercase tracking-wider ml-1">Password</label>
            <input type="password" id="password" placeholder="••••••••"
              class="w-full border-slate-200 border-2 rounded-xl p-3 mt-1 outline-none transition-all duration-300 focus:border-violet-400 focus:ring-4 focus:ring-violet-100">
          </div>

          <p id="error-msg" class="text-rose-500 text-xs font-medium text-center hidden bg-rose-50 p-2 rounded-lg"></p>

          <button class="mt-2 bg-violet-600 hover:bg-violet-700 active:scale-95 text-white font-bold py-3 rounded-xl shadow-lg shadow-violet-200 transition-all duration-300">
            Iniciar Sesión
          </button>
        </form>

        <div class="mt-8 text-center">
          <a href="#" class="text-xs text-slate-400 hover:text-violet-600 transition-colors">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>`;
}