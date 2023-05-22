// Définition de la fonction Displayconf
function Displayconf() {
  // Récupération de l'élément HTML avec l'id "orderId"
  const orderId = document.getElementById("orderId");

  let param = new URL(document.location).searchParams;
  console.log(param);
  // Récupération de l'orderId de l'url et insertion de cette valeur dans l'élément HTML récupéré précédemment
  orderId.innerText = param.get("orderId");

  // Affichage de l'orderId dans la console
  console.log(param.get("orderId"));

  // Effacement de toutes les données stockées dans le localStorage
  localStorage.clear();
}

// Appel de la fonction Displayconf
Displayconf();
