document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevenir que el formulario se envíe y la página se actualice

  var correo = document.getElementById("correo").value;
  var password = document.getElementById("password").value;

  // Construir el objeto de solicitud
  var payload = {
    correo: correo,
    password: password
  };

  // Realizar la solicitud API
  fetch("http://localhost:8080/entrenadores/login", {
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
    // Manejar el inicio de sesión exitoso
    console.log("Inicio de sesión exitoso");
    // Redirigir a la página de dashboard o realizar cualquier otra acción necesaria
    window.location.href = "../admin/admin.html";
  })
  .catch(function(error) {
    // Manejar el inicio de sesión fallido
    console.error("Error de inicio de sesión:", error);
    // Mostrar el mensaje de error en el formulario
    var errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = error.message;
  });
});