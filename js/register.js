document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const cedula = document.getElementById('cedula').value;
    const genero = document.getElementById('genero').value;
    const edad = document.getElementById('edad').value;
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;
  
    const data = {
      nombre: nombre,
      apellidos: apellidos,
      cedula: cedula,
      genero: genero,
      edad: edad,
      correo: correo,
      contraseña: contraseña
    };
  
    fetch('URL_DE_LA_API_DE_REGISTRO', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Ha ocurrido un error, intente mas tarde");
        }
      })
    .then(function(data) {
        // Manejar el inicio de sesión exitoso
        console.log("Inicio de sesión exitoso");
        // Redirigir a la página de dashboard o realizar cualquier otra acción necesaria
        window.location.href = "../cliente/index.html";
      })
      .catch(function(error) {
        // Manejar el inicio de sesión fallido
        console.error("Error de inicio de sesión:", error);
        // Mostrar el mensaje de error en el formulario
        var errorMessage = document.getElementById("error-message");
        errorMessage.innerHTML = error.message;
      });
  });
  