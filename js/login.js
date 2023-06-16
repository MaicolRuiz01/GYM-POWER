class Login {
    constructor() {
      this.loginForm = document.getElementById('login-form');
      this.loginForm.addEventListener('submit', this.login.bind(this));
    }
  
    login(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      const data = {
        username: username,
        password: password
      };
  
      fetch('URL_DE_LA_API_DE_LOGIN', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
        // Manejar la respuesta de la API
        console.log(result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }
  
  const login = new Login();


