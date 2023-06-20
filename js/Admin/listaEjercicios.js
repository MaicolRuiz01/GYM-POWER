

// Función para listar los ejercicios
function listarEjercicios() {
  fetch(urlBackend + '/ejercicio')
    .then(response => response.json())
    .then(data => {
      // Obtener el contenedor donde se mostrarán los ejercicios
      const contenedor = document.getElementById('contenedor-ejercicios');
      contenedor.innerHTML = '';

      // Iterar sobre los ejercicios y crear las tarjetas
      data.forEach(ejercicio => {
        const card = crearCardEjercicio(ejercicio);
        contenedor.appendChild(card);
      });
    })
    .catch(error => {
      console.log(error);
    });
}

// Función para crear la tarjeta de un ejercicio
function crearCardEjercicio(ejercicio) {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const titulo = document.createElement('h5');
  titulo.classList.add('card-title');
  titulo.textContent = ejercicio.nombre;

  const descripcion = document.createElement('p');
  descripcion.classList.add('card-text');
  descripcion.textContent = ejercicio.descripcion;



  const linkYoutube = document.createElement('iframe');
linkYoutube.width = '560';
linkYoutube.height = '315';
linkYoutube.src = ejercicio.link;
linkYoutube.title = ejercicio.nombre;
linkYoutube.frameBorder = '0';
linkYoutube.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
linkYoutube.allowFullscreen = true;

  const eliminarButton = document.createElement('button');
  eliminarButton.classList.add('btn', 'btn-outline-danger');
  eliminarButton.style.margin='3rem'

  eliminarButton.textContent = 'Eliminar';
  eliminarButton.addEventListener('click', () => {
    eliminarEjercicio(ejercicio.id);
  });

  const modificarButton = document.createElement('button');
  modificarButton.classList.add('btn', 'btn-primary');
  modificarButton.textContent = 'Modificar';
  modificarButton.addEventListener('click', () => {
    mostrarModalModificar(ejercicio);
  });

  cardBody.appendChild(titulo);
  cardBody.appendChild(descripcion);
  cardBody.appendChild(linkYoutube);
  cardBody.appendChild(eliminarButton);
  cardBody.appendChild(modificarButton);

  card.appendChild(cardBody);

  return card;
}

// Función para eliminar un ejercicio
function eliminarEjercicio(idEjercicio) {
  fetch(urlBackend + '/ejercicio/' + idEjercicio, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      listarEjercicios();
    })
    .catch(error => {
      console.log(error);
    });
}

// Función para mostrar el modal de modificar ejercicio
function mostrarModalModificar(ejercicio) {
  const modal = document.getElementById('modal-modificar');
  const nombreInput = document.getElementById('nombre-modificar');
  const descripcionInput = document.getElementById('descripcion-modificar');
  const linkInput = document.getElementById('link-modificar');
  const repeticionesInput = document.getElementById('repeticiones-modificar');

  // Asignar los valores actuales al modal
  nombreInput.value = ejercicio.nombre;
  descripcionInput.value = ejercicio.descripcion;
  linkInput.value = ejercicio.link;
  repeticionesInput.value = ejercicio.repeticiones;

  // Abrir el modal
  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();

  // Agregar el evento al botón de actualizar
  const actualizarButton = document.getElementById('actualizar-ejercicio');
  actualizarButton.addEventListener('click', () => {
    const nuevoNombre = nombreInput.value;
    const nuevaDescripcion = descripcionInput.value;
    const nuevoLink = linkInput.value;
    const nuevasRepeticiones = repeticionesInput.value;

    // Llamar a la función para actualizar el ejercicio
    actualizarEjercicio(ejercicio.id, nuevoNombre, nuevaDescripcion, nuevoLink, nuevasRepeticiones);

    // Cerrar el modal
    bootstrapModal.hide();
  });
}

// Función para actualizar un ejercicio
function actualizarEjercicio(idEjercicio, nuevoNombre, nuevaDescripcion, nuevoLink, nuevasRepeticiones) {
  const ejercicio = {
    nombre: nuevoNombre,
    descripcion: nuevaDescripcion,
    link: nuevoLink,
    repeticiones: nuevasRepeticiones
  };

  fetch(urlBackend + '/ejercicio/' + idEjercicio, {
    method: 'PUT',
    body: JSON.stringify(ejercicio),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      listarEjercicios();
    })
    .catch(error => {
      console.log(error);
    });
}

// Llamar a la función para listar los ejercicios al cargar la página
listarEjercicios();
