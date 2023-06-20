// Función para registrar un nuevo usuario
function registrarUsuario() {
    // Obtener los valores de los campos del formulario
    var nombre = document.getElementById('nombre').value;

    var apellido = document.getElementById('apellidos').value;
    var documento = document.getElementById('cedula').value;
    var genero = document.getElementById('genero').value;
    var edad = document.getElementById('edad').value;
    var fecha_nac = document.getElementById('fechaNacimiento').value;
    var correo = document.getElementById('correo').value;
    var contraseña = document.getElementById('contraseña').value;
    var id_rol = 1;

    // Crear el objeto de usuario con los valores
    var usuario = {
        nombre: nombre,
 
        apellido: apellido,
        documento: documento,
        genero: genero,
        edad: edad,
        fecha_nac: fecha_nac,
        correo: correo,
        contraseña: contraseña,
        id_rol: id_rol
    };

    // Realizar la petición POST a la API REST para registrar el usuario
    fetch('http://localhost:8080/usuarios/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => {

        // Mostrar notificación de éxito
        swal({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'El usuario ha sido registrado correctamente.'
        }).then(function() {
            // Redireccionar al usuario a la página de inicio de sesión
            window.location.href = 'login.html';
        });
    })
    .catch(error => {
        // Mostrar notificación de error
        swal({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo registrar el usuario. Inténtalo nuevamente.'
        });

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