
let monPanier = JSON.parse(localStorage.getItem("monPanier")) || [];
console.log(monPanier);



// Définir les variables de protocole et de domaine pour les requêtes API
let protocole = "http://";
let monDomaine = "localhost:3000/api/products/";

// Fonction pour afficher le panier
function displayCart() {
  console.log(monPanier);
  // Boucle pour récupérer les produits stockés dans le panier (monPanier)
  for (const stock of monPanier) {
    
    // Créer l'URL pour récupérer les informations du produit
    let url = `${protocole}${monDomaine}${stock.id}`;
    console.log(url);

    // Initialisation de la variable id
    let id = stock.id;

    // Sélection de la section cart__items et création d'un élément article
    let section = document.querySelector("#cart__items");
    let article = document.createElement("article");
    
    // Ajouter l'article à la section et définir les attributs de classe et de données
    section.appendChild(article);
    article.setAttribute("class", "cart__item");
    article.setAttribute("data-id", stock.id);
    article.setAttribute("data-color", stock.color);

    // Créer un élément div et l'ajouter à l'article
    let div = document.createElement("div");
    article.appendChild(div);
    div.setAttribute("class", "cart__item__img");
    // Créer un élément img, définir ses attributs et l'ajouter à la div
    let img = document.createElement("img");
    div.appendChild(img);
    img.src = stock.img;
    img.setAttribute("alt", "Photographie d'un canapé");
    // Créer un élément div et l'ajouter à l'article
    let content = document.createElement("div");
    article.appendChild(content);
    content.setAttribute("class", "cart__item__content"); 
    // Créer un élément div et l'ajouter à div item__content
    let contentDescription = document.createElement("div");
    content.appendChild(contentDescription);
    contentDescription.setAttribute("class", "cart__item__content__description");
    //Créer un element H2 et l'ajouter à item content description
    let title = document.createElement("h2");
    contentDescription.appendChild(title);
    title.innerText = stock.name;
    //Créer un <p> pour indiquer la couleur
    let color = document.createElement("p");
    contentDescription.appendChild(color);
    color.innerText = stock.colors;
    //Créer un <p> pour indiquer le prix
    let price = document.createElement("p");
    contentDescription.appendChild(price);
    price.innerText = stock.price + " €";
    // Créer un element div settings
    let settings = document.createElement("div");
    content.appendChild(settings);
    settings.setAttribute("class", "cart__item__content__settings");
    // Créer un element quantite
    let settingQuantity = document.createElement("div");
    settings.appendChild(settingQuantity);
    settingQuantity.setAttribute("class", "cart__item__content__settings__quantity");
    //
    let quantity = document.createElement("p");
    settingQuantity.appendChild(quantity);
    quantity.innerText = "Qté : ";
    //
    let quantityInput = document.createElement("input");
    settingQuantity.appendChild(quantityInput);
    quantityInput.setAttribute("class", "itemQuantity" );
    quantityInput.value = stock.quantite;
    //
    let settingDelete = document.createElement("div");
    settings.appendChild(settingDelete);
    settingDelete.setAttribute("class", "cart__item__content__settings__delete" );
    //
    let itemDelete = document.createElement("p");
    settingDelete.appendChild(itemDelete);
    itemDelete.setAttribute("class", "deleteItem");
    itemDelete.innerHTML = "Supprimer";

  };

};

// Appeler la fonction displayCart pour afficher le panier
  displayCart();

// Calcul de la quantité total de mon panier
function totalArticle () {

  let calculQ = [];

  for (q = 0; q < monPanier.length; q++) {
    const Qte = parseInt(monPanier[q].quantite);
    calculQ.push(Qte);
    totalQ = calculQ.reduce((a,b) => a + b, 0);
  }
  const prixTotalQ = document.getElementById("totalQuantity");
  prixTotalQ.textContent = totalQ;
}
 
totalArticle();

// Modification de la quantité 
const inputQ = document.querySelectorAll(".itemQuantity");
inputQ.forEach(input => {
  input.addEventListener('change', function() {
    alert('Je modifie la quantite');
  });
});

// elementList = parentNode.querySelectorAll(selectors , chaque input de mon article); ==> initialiser la variable
// Chaque input faire l'evenement 
// Boucle for sur tous les elements de type variable
// Ajout de l'element change sur chaque input
// Ecouter chaque input

// Faire une fonction de comparaison ( id et la couleur)
// Si l'id et la couleur sont identique tu modifies la quantités ( addition)
//



