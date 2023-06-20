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
function llamarListaPlanes(){
    listaPlanes()
   .then(response=>response.json())
   .then(planes=>{
       console.log(planes)
       const selectPlanes = document.getElementById('planes');

       let body=""
       for (let i = 0; i < planes.length; i++) {
           body+=`<div class="form-check">
           <input class="form-check-input" type="checkbox" value="${planes[i].id}" id="flexCheckDefault">
           <label class="form-check-label" for="flexCheckDefault">
             ${planes[i].nombre}
           </label>
         </div>
           `
           
       }
       document.getElementById("planes").innerHTML=body
   })
   .catch(error=>{
       console.log(error)
   })

}




function limpiarCampos() {
    nombreInput.value = '';
    descripcionInput.value = '';
    tiempoInput.value = '';
    ejerciciosSelect.selectedIndex = -1;
  }