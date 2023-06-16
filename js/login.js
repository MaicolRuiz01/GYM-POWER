document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
  
    var codigo = document.getElementById("codigo").value;
    var password = document.getElementById("password").value;
  
    // Construct the request payload
    var payload = {
      codigo: codigo,
      password: password
    };
  
    // Perform the API request
    fetch("http://localhost:8080/generate-token", {
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
      // Store the token in localStorage
      localStorage.setItem("token", data.token);
  
      // Redirect to dashboard.html
      window.location.href = "../admin/admin.html";
    })
    .catch(function(error) {
      // Handle failed login
      document.getElementById("message").innerHTML = error.message;
    });
  });