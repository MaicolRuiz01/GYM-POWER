
const urlBackend = "http://localhost:8080"

function registrarHerramienta(){

    let nombre=document.getElementById("nombre").value;
    let descripcion=document.getElementById("descripcion").value;

    const herramienta={
        nombre,
        descripcion
    }

    console.log(herramienta)
    guardarHerramienta(herramienta)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
    })
    .catch(error=>{
        console.log(error)
    })
}
async function guardarHerramienta(herramienta){

    const result=await fetch(urlBackend+"/herramientas/save",{
        method: 'POST',
        body:JSON.stringify(herramienta),
        headers:{
            "Content-type":"application/json"
        }
    })
    return result
}
