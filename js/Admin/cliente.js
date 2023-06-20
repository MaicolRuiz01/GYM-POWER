// URL del backend


// Función para obtener la lista de usuarios
async function obtenerUsuarios() {
  try {
    // Realizar una solicitud GET al backend para obtener la lista de usuarios
    const response = await fetch(`${urlBackend}/usuarios`);
    const data = await response.json();

    // Obtener el contenedor donde se mostrarán las tarjetas de usuarios
    const contenedorUsuarios = document.getElementById("contenedor-usuarios");

    // Limpiar el contenedor antes de mostrar los usuarios
    contenedorUsuarios.innerHTML = "";

    // Filtrar los usuarios cuyo id_rol sea igual a 1
    const usuariosFiltrados = data.filter((usuario) => usuario.id_rol === 1);

    // Recorrer la lista de usuarios filtrados y mostrar la información en tarjetas
    usuariosFiltrados.forEach((usuario) => {
      const { nombre, apellido, genero, correo, fecha_nac } = usuario;

      // Crear una tarjeta para cada usuario
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${nombre} ${apellido}</h5>
          <p class="card-text">
            <strong>Correo:</strong> ${correo}<br>
            <strong>Fecha de Nacimiento:</strong> ${fecha_nac}<br>
            <strong>Género:</strong> ${genero}<br>
            <strong>ID Rol:</strong> ${usuario.id_rol}<br>
          </p>
        </div>
      `;

      // Agregar la tarjeta al contenedor
      contenedorUsuarios.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
}

// Llamar a la función obtenerUsuarios al cargar la página
window.addEventListener("load", obtenerUsuarios);
