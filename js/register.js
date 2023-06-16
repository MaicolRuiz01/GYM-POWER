// Función para registrar un nuevo usuario
function registrarUsuario() {
    // Obtener los valores de los campos del formulario
    var nombre = document.getElementById('nombre').value;
    var apellidos = document.getElementById('apellidos').value;
    var cedula = document.getElementById('cedula').value;
    var genero = document.getElementById('genero').value;
    var edad = document.getElementById('edad').value;
    var correo = document.getElementById('correo').value;
    var contraseña = document.getElementById('contraseña').value;

    // Crear el objeto de usuario con los valores
    var usuario = {
        nombre: nombre,
        apellidos: apellidos,
        cedula: cedula,
        genero: genero,
        edad: edad,
        correo: correo,
        contraseña: contraseña
    };

    // Realizar la petición POST a la API REST para registrar el usuario
    fetch('https://api.example.com/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => {
        // Manejar la respuesta de la API
        console.log(data); // Aquí puedes hacer algo con la respuesta, como mostrar un mensaje de éxito
    })
    .catch(error => {
        // Manejar el error en caso de que la petición falle
        console.error('Error:', error);
    });
}

// Obtener el formulario de registro
var registerForm = document.getElementById('register-form');

// Agregar el evento de envío del formulario
registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto
    registrarUsuario(); // Llamar a la función para registrar el usuario
});
