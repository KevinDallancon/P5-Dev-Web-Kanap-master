// Définition de la fonction Displayconf
function Displayconf() {
  // Récupération de l'élément HTML avec l'id "orderId"
  const orderId = document.getElementById("orderId");

  // Récupération de l'orderId du localStorage et insertion de cette valeur dans l'élément HTML récupéré précédemment
  orderId.innerText = localStorage.getItem("orderId");

  // Affichage de l'orderId dans la console
  console.log(localStorage.getItem("orderId"));

  // Effacement de toutes les données stockées dans le localStorage
  localStorage.clear();
}

// Appel de la fonction Displayconf
Displayconf();
