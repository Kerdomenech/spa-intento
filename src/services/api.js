export const BASE_URL = 'http://localhost:5000'

/*1.creas una funcion y la llamas getProjects().
2.La función hace una llamada a la API (servidor).
3.El servidor busca los proyectos en la base de datos y los envía de vuelta.
4.La función los transforma en formato JSON legible.
5.Tu aplicación recibe la lista y ya puedes pintarla en la pantalla.*/

export async function getProjects( ){
    const res = await fetch(`${BASE_URL}/projects`)
    return res.json()
}

/*1. Declaración de una función asíncrona que exportamos para usar en otros archivos.
Recibe como parámetro el 'userId' (ID único del usuario que queremos consultar).
2. Realiza la petición HTTP (GET) al servidor usando fetch.
 Usa '?' para enviar un parámetro de búsqueda (Query Param) llamado 'assignedTo'.
 El 'await' pausa la función hasta que el servidor responda con los datos filtrados.
3. Transforma la respuesta en bruto del servidor a un formato JSON (objeto/array de JS).
Usa 'return' para enviar esa lista de proyectos filtrados a quien haya llamado la función.
*/

export async function getProjectsByUser(userId){
    const res = await fetch(`${BASE_URL}/projects?assignedTo=${userId}`)
    return res.json()
}


/*1. Creas una función asíncrona llamada createProject que recibe un objeto 'project'.
2. La función hace una petición POST a la API para enviar la información del nuevo proyecto.
3. Se configuran cabeceras (headers) para avisar al servidor que los datos van en formato JSON.
4. El objeto de JavaScript se convierte a una cadena de texto (string) para que el servidor lo entienda.
5. La función recibe la respuesta del servidor, la transforma a JSON y te devuelve el proyecto creado.*/
export async function createProject (projects){
    const res= await fetch (`${BASE_URL}/projects`,{
        method:"POST",
        headers:{ "Content-Type":"application/json"}, 
        body: JSON.stringify (projects)
    });
    return res.json ()
}

/*1. Creas una función asíncrona llamada updateProject que recibe el 'id' del proyecto y los nuevos datos ('project').
2. La función hace una petición PUT a la API apuntando específicamente al ID del proyecto que se quiere modificar.
3. Se configuran las cabeceras (headers) para indicarle al servidor que los datos se envían en formato JSON.
4. El objeto con los cambios se convierte a texto con JSON.stringify para que el servidor pueda procesarlo.
5. El servidor aplica los cambios y la función te devuelve el proyecto ya actualizado y guardado.*/

export async function updateProject(id, project) {
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project)
  });
  return res.json();
}

/*1. Creas una función asíncrona llamada patchProyectStatus que recibe el 'id' del proyecto y el nuevo estado ('status').
2. La función hace una petición PATCH a la API apuntando al ID específico del proyecto que se va a modificar.
3. Se añaden las cabeceras (headers) obligatorias para indicarle al servidor que recibirá datos en formato JSON.
4. Usas JSON.stringify({ status }) para enviar únicamente el campo del estado modificado, sin alterar el resto del proyecto.
5. El servidor actualiza el estado en la base de datos y la función te devuelve el proyecto con su nuevo estatus.*/
export async function patchProjectStatus(id,status) {
    const res= await fetch (`${BASE_URL}/projects/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
    });
    return res.json();
}

/*1. Creas una función asíncrona llamada deleteProject que recibe como parámetro el 'id' del proyecto a borrar.
2. La función hace una petición HTTP utilizando fetch apuntando directamente a la URL con el ID específico del proyecto.
3. Se configura el objeto con el método "DELETE" para ordenarle al servidor que elimine ese registro por completo.
4. Se usa 'await' para asegurar que la función espere a que el servidor termine de borrar el archivo en la base de datos.
5. Al ser un borrado, no es obligatorio usar 'res.json()' ya que la mayoría de las API responden con un código de éxito vacío.*/

export async function deleteProject(id) {
    await fetch (`${BASE_URL}/projects/${id}`, {
    method: "DELETE"})
}
