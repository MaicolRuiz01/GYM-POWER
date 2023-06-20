

function registrarEjercicio(){
    let nombre=document.getElementById("nombre").value;
    let link=document.getElementById("link").value
    let descripcion=document.getElementById("descripcion").value
	let repeticiones=document.getElementById("repeticiones").value
    let herramienta = document.getElementById("herramientas");
    let selectedValue = herramienta.value;



    const Ejercicio={
        nombre,
        link,
        descripcion,
        repeticiones,
        herramienta:{
            id:Number(selectedValue)
        }
        

    }

    console.log(Ejercicio)
    guardarEjercicio(Ejercicio)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
    })
    .catch(error=>{
        console.log(error)
    })
}

async function guardarEjercicio(Ejercicio){

    const result=await fetch(urlBackend+"/ejercicio/save",{
        method: 'POST',
        body: JSON.stringify(Ejercicio),
        headers: {
            "Content-type":"application/json"
        }
    })
    return result

}

async function listaHerramientas(){

    const result=await fetch(urlBackend+"/herramientas",{
        method: 'GET',
        Headers: {
            "Content-type":"application/json"
        }
    })
    return result

}

function llamarLista(){
     listaHerramientas()
    .then(response=>response.json())
    .then(herramientas=>{
        console.log(herramientas)
        const selectHerramientas = document.getElementById('herramientas');

        herramientas.forEach((herramienta) => {
          const option = document.createElement('option');
          option.value = herramienta.id;
          option.textContent = herramienta.nombre;
          selectHerramientas.appendChild(option);
        });
    })
    .catch(error=>{
        console.log(error)
    })

}
