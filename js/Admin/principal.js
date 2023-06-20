const urlBackend = "http://localhost:8080"

async function mostrarNombre(){
    let nombre=document.getElementById("inputNombre")
    const nombreUsuario=document.getElementById("nombreUsuario")
    const titulo=document.createElement('h1')
    titulo.value=nombre
    nombreUsuario.appendChild(titulo)


}