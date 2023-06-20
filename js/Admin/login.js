document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el envío del formulario y la recarga de la página
  
    var correo = document.getElementById("correo").value;
    var password = document.getElementById("password").value;
  
    // Construir el objeto de datos para enviar en la solicitud
    var payload = {
      correo: correo,
      password: password
    };
  
    // Realizar la solicitud POST a la API
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
  
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error de inicio de sesión. Verifica tus credenciales.");
        }
      })
      .then(function(data) {
  
        // Mostrar notificación de éxito
        swal({
          icon: "success",
          title: "¡Datos válidos!",
          text: "Inicio de sesión exitoso"
        }).then(function() {
          // Redireccionar al panel de control
          window.location.href = "dashboard.html";
        });
      })
      .catch(function(error) {
        // Mostrar notificación de error
        swal({
          icon: "error",
          title: "Error",
          text: "Correo o contraseña incorrectos"
        });
        console.error(error);
      });
  });