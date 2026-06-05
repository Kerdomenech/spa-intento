import { BASE_URL } from "./api";

/*1.Recibe el correo y la contraseña.
2.Va al servidor a buscar un usuario que coincida con esos dos datos.
3.Espera la respuesta y la convierte a JavaScript.
4.Si lo encuentra, te da el usuario; si no, te devuelve un null.*/

export async function loginUser(email, password) {
    const res = await fetch(`${BASE_URL}/users?email=${email}&password=${password}`);
    const data = await res.json();
    return data[0] || null;
}
