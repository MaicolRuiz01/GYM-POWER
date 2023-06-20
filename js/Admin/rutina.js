async function registrarRutina(){
    let titulo=document.getElementById("titulo")
    let ejercicios=document.getElementById("ejercicios")
    let plan=document.getElementById("plan")

    const Rutina={

        titulo,
        ejercicios,
        plan

    }

    console.log(Rutina)
    guardarRutina(Rutina)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
    })
    .catch(error=>{
        console.log(error)
    })
}

async function guardarRutina(Rutina){

    const result=await fetch(urlBackend+"/rutina/save",{
        method: 'POST',
        body: JSON.stringify(Rutina),
        headers: {
            "Content-type":"application/json"
        }
    })
    return result
}

async function listaPlanes(){

    const result=await fetch(urlBackend+"/plan",{
        method: 'GET',
    
        headers: {
            "Content-type":"application/json"
        }
    })
    return result

}
async function llamarListaPlanes() {
  listaPlanes()
    .then(response => response.json())
    .then(planes => {
      console.log(planes);
      const selectPlanes = document.getElementById("planes");

      let body = "";
      for (let i = 0; i < planes.length; i++) {
        body += `
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">${planes[i].nombre}</h5>
              <p class="card-text">${planes[i].descripcion}</p>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="plan" value="${planes[i].id}" id="plan${planes[i].id}">
                <label class="form-check-label" for="plan${planes[i].id}">
                  Seleccionar
                </label>
              </div>
            </div>
          </div>
        `;
      }
      document.getElementById("planes").innerHTML = body;
    })
    .catch(error => {
      console.log(error);
    });
}

function obtenerPlanesSeleccionados() {
  const planInputs = document.getElementsByName("plan");
  for (let i = 0; i < planInputs.length; i++) {
    if (planInputs[i].checked) {
      return planInputs[i].value;
    }
  }
  return null;
}

// 

const ejerciciosContainer = document.getElementById('ejercicios-container');

// Función para crear una card de ejercicio
function createExerciseCard(exercise) {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'ejercicios';
  checkbox.value = exercise.id;
  checkbox.id = `ejercicio-${exercise.id}`;

  const label = document.createElement('label');
  label.innerHTML = exercise.nombre;
  label.classList.add('card-title');
  label.setAttribute('for', `ejercicio-${exercise.id}`);

  const repeticiones = document.createElement('p');
  repeticiones.innerHTML = `Repeticiones: ${exercise.repeticiones}`;

  const descripcion = document.createElement('p');
  descripcion.innerHTML = `Descripción: ${exercise.descripcion}`;

  cardBody.appendChild(checkbox);
  cardBody.appendChild(label);
  cardBody.appendChild(repeticiones);
  cardBody.appendChild(descripcion);

  card.appendChild(cardBody);

  return card;
}

// Función para cargar los ejercicios desde la API y generar las cards
async function loadExercises() {
  try {
    const response = await fetch('http://localhost:8080/ejercicio');
    const data = await response.json();

    data.forEach(exercise => {
      const exerciseCard = createExerciseCard(exercise);
      ejerciciosContainer.appendChild(exerciseCard);
    });
  } catch (error) {
    console.log('Error al cargar los ejercicios:', error);
  }
}

// Llamamos a la función para cargar los ejercicios al cargar la página
loadExercises();



function limpiarCampos() {
    nombreInput.value = '';
    descripcionInput.value = '';
    tiempoInput.value = '';
    ejerciciosSelect.selectedIndex = -1;
  }

  // Función para registrar una rutina
async function registrarRutina(nombre, ejercicios, plan) {
    try {
      // Registrar la rutina
      const rutinaResponse = await fetch('http://localhost:8080/rutina/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre })
      });
  
      if (!rutinaResponse.ok) {
        throw new Error('Error al registrar la rutina');
      }
  
      const rutinaData = await rutinaResponse.json();
      const id_rutina = rutinaData.id;
  
      // Registrar los ejercicios asociados a la rutina
      for (const id_ejercicio of ejercicios) {
        const ejercicioRutinaResponse = await fetch('http://localhost:8080/rutina/ejercicio/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id_rutina, id_ejercicio })
        });
  
        if (!ejercicioRutinaResponse.ok) {
          throw new Error('Error al registrar el ejercicio de la rutina');
        }
      }
  
      // Registrar el plan asociado a la rutina
      const planRutinaResponse = await fetch('http://localhost:8080/plan/rutina/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_rutina, id_plan: plan })
      });
  
      if (!planRutinaResponse.ok) {
        throw new Error('Error al registrar el plan de la rutina');
      }
  
      console.log('Rutina registrada exitosamente');
    } catch (error) {
      console.log('Error al registrar la rutina:', error.message);
    }
  }
  
  // Obtener los datos seleccionados de la interfaz
  const nombreRutina = document.getElementById('nombre').value;
  const ejerciciosSeleccionados = Array.from(document.querySelectorAll('input[name="ejercicio"]:checked')).map(input => input.value);
  const planSeleccionado = document.getElementById('planes').value;
  
  // Llamar a la función para registrar la rutina
  registrarRutina(nombreRutina, ejerciciosSeleccionados, planSeleccionado);