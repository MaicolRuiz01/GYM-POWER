window.addEventListener('DOMContentLoaded', () => {
    // Obtener referencia a los elementos del HTML
    const userNameElement = document.getElementById('user-name');
    const userLastNameElement = document.getElementById('user-lastname');
    const userGenderElement = document.getElementById('user-gender');
    const userDocumentElement = document.getElementById('user-document');
    const userExercisePlanElement = document.getElementById('user-exercise-plan');
    const userPhotoElement = document.getElementById('user-photo');
  
    // Llamada a la API para obtener la información del usuario
    fetch('/api/user-info') // Ruta de la API REST que devuelve los datos del usuario
      .then(response => response.json())
      .then(data => {
        // Actualizar los elementos del HTML con los datos del usuario
        userNameElement.textContent = data.name;
        userLastNameElement.textContent = data.lastname;
        userGenderElement.textContent = data.gender;
        userDocumentElement.textContent = data.document;
        userExercisePlanElement.textContent = data.exercisePlan;
        userPhotoElement.src = data.photoUrl;
      })
      .catch(error => {
        console.error('Error al obtener los datos del usuario:', error);
      });
  });
  