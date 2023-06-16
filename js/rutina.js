// Obtener referencia al formulario y los elementos del mismo
const rutinaForm = document.getElementById('rutinaForm');
const nombreInput = document.getElementById('nombre');
const descripcionInput = document.getElementById('descripcion');
const tiempoInput = document.getElementById('tiempo');
const ejerciciosSelect = document.getElementById('ejercicios');

// Evento submit del formulario
rutinaForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtener los valores de los campos de entrada
  const nombre = nombreInput.value;
  const descripcion = descripcionInput.value;
  const tiempo = tiempoInput.value;
  const ejerciciosSeleccionados = Array.from(ejerciciosSelect.selectedOptions).map(option => option.value);

  // Realizar la lógica para registrar la rutina con los datos obtenidos
  registrarRutina(nombre, descripcion, tiempo, ejerciciosSeleccionados);

  // Limpiar los campos del formulario
  limpiarCampos();
});

// Función para limpiar los campos del formulario
function limpiarCampos() {
  nombreInput.value = '';
  descripcionInput.value = '';
  tiempoInput.value = '';
  ejerciciosSelect.selectedIndex = -1;
}

// Función para registrar la rutina con los datos obtenidos
function registrarRutina(nombre, descripcion, tiempo, ejerciciosSeleccionados) {
  // Realizar la lógica para enviar los datos al backend y registrar la rutina
  // Puedes utilizar Fetch API o realizar una petición AJAX para enviar los datos al backend
  // Aquí solo se muestra un ejemplo básico de la llamada al backend
  const datosRutina = {
    nombre: nombre,
    descripcion: descripcion,
    tiempo: tiempo,
    ejercicios: ejerciciosSeleccionados
  };

  // Aquí puedes hacer la petición al backend utilizando los datosRutina
  // Ejemplo:
  // fetch('/ruta-del-backend', {
  //   method: 'POST',
  //   body: JSON.stringify(datosRutina),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  // .then(response => response.json())
  // .then(data => {
  //   // Manejar la respuesta del backend
  //   console.log('Rutina registrada:', data);
  // })
  // .catch(error => {
  //   // Manejar errores
  //   console.error('Error al registrar la rutina:', error);
  // });
}

// Lógica para obtener los ejercicios desde el backend y llenar el select
function obtenerEjercicios() {
  // Realizar la lógica para obtener los ejercicios desde el backend
  // Puedes utilizar Fetch API o realizar una petición AJAX para obtener los ejercicios
  // Aquí solo se muestra un ejemplo básico de la llamada al backend y llenado del select
  const ejercicios = [
    { nombre: 'Ejercicio 1', repeticiones: 10, descripcion: 'Descripción 1', maquina: 'Máquina 1' },
    { nombre: 'Ejercicio 2', repeticiones: 12, descripcion: 'Descripción 2', maquina: 'Máquina 2' },
    { nombre: 'Ejercicio 3', repeticiones: 8, descripcion: 'Descripción 3', maquina: 'Máquina 3' },
    // Agrega aquí más ejercicios obtenidos desde el backend
  ];

  // Llenar el select con los ejercicios obtenidos
  ejercicios.forEach(ejercicio => {
    const option = document.createElement('option');
    option.value = ejercicio.nombre;
    option.textContent = ejercicio.nombre;
    ejerciciosSelect.appendChild(option);
  });
}

// Llamar a la función para obtener los ejercicios al cargar la página
obtenerEjercicios();
