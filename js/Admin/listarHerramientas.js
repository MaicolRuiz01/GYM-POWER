const urlBackend = "http://localhost:8080";

// Cargar la lista de herramientas al cargar la página
window.addEventListener('load', cargarHerramientas);

function cargarHerramientas() {
  fetch(urlBackend + "/herramientas")
    .then(response => response.json())
    .then(data => {
      data.forEach(herramienta => {
        mostrarHerramienta(herramienta);
      });
    })
    .catch(error => {
      console.log(error);
    });
}

function mostrarHerramienta(herramienta) {
  const cardTemplate = `
    <div class="card col-md-10" style="margin: 4rem">
      <div class="card-body">
        <h5 class="card-title">${herramienta.nombre}</h5>
        <p class="card-text">${herramienta.descripcion}</p>
        <button class="btn btn-outline-danger" onclick="eliminarHerramienta(${herramienta.id})">Eliminar</button>
        <button class="btn btn-outline-warning" onclick="editarHerramienta(${herramienta.id})" data-toggle="modal" data-target="#editarModal">Modificar</button>
      </div>
    </div>
  `;

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML += cardTemplate;
}

function eliminarHerramienta(herramientaId) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch(urlBackend + "/herramientas/" + herramientaId, {
            method: 'DELETE'
          })
            .then(response => {
              if (response.ok) {
                const card = document.getElementById(`card-${herramientaId}`);
                card.remove();
                swal("Poof! Your imaginary file has been deleted!", {
                  icon: "success",
                })
                  .then(() => {
                    recargarListaHerramientas(); // Recargar la lista de herramientas
                  });
              } else {
                throw new Error("Error al eliminar la herramienta");
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
  }

function editarHerramienta(herramientaId) {
  fetch(urlBackend + "/herramientas/" + herramientaId)
    .then(response => response.json())
    .then(herramienta => {
      const editarModal = document.getElementById("editarModal");
      editarModal.querySelector("#editar-nombre").value = herramienta.nombre;
      editarModal.querySelector("#editar-descripcion").value = herramienta.descripcion;
      editarModal.querySelector("#btn-actualizar").onclick = () => {
        actualizarHerramienta(herramientaId);
        limpiarCampos();
        swal("Se ha Actualizado", "Se actualizado la herramienta exitosamente!", "success")
      };
    })
    .catch(error => {
      console.log(error);
    });
}

function actualizarHerramienta(herramientaId) {
    const nombre = document.getElementById("editar-nombre").value;
    const descripcion = document.getElementById("editar-descripcion").value;
  
    const herramienta = {
      nombre,
      descripcion
    };
  
    fetch(urlBackend + "/herramientas/" + herramientaId, {
      method: 'PUT',
      body: JSON.stringify(herramienta),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          const card = document.getElementById(`card-${herramientaId}`);
          card.querySelector(".card-title").textContent = nombre;
          card.querySelector(".card-text").textContent = descripcion;
          console.log("Herramienta actualizada");
          $('#editarModal').modal('hide');
          swal("Se ha Actualizado", "Se actualizado la herramienta exitosamente!", "success")
            .then(() => {
              recargarListaHerramientas(); // Recargar la lista de herramientas
            });
        } else {
          throw new Error("Error al actualizar la herramienta");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

function limpiarCampos() {
  document.getElementById("editar-nombre").value = "";
  document.getElementById("editar-descripcion").value = "";
}

function recargarListaHerramientas() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""; // Limpiar el contenedor de las cards
  
    cargarHerramientas(); // Volver a cargar la lista de herramientas
  }
  
  
