fetch('https://tudominio.com/api/usuario/1') // Reemplaza la URL con la correspondiente a tu API y el ID del usuario
  .then(response => response.json())
  .then(data => {
    const nombreUsuario = data.nombre; // Asumiendo que la respuesta del servidor contiene un campo "nombre" con el nombre del usuario
    document.getElementById('nombreUsuario').textContent = nombreUsuario;
  })
  .catch(error => {
    console.error('Error al obtener los datos del usuario:', error);
  });
