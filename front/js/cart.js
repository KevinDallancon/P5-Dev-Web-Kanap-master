// Récupérer le contenu du panier depuis le localStorage ou utiliser un tableau vide si le panier est vide
let monPanier = JSON.parse(localStorage.getItem("monPanier")) || [];
console.log(monPanier);

// Définir les variables de protocole et de domaine pour les requêtes API
let protocole = "http://";
let monDomaine = "localhost:3000/api/products/";

// Fonction pour afficher le panier
function displayCart() {
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
    price.innerText = stock.price + "€";
    // Créer un element div settings
    let settings = document.createElement("div");
    content.appendChild(settings);
    settings.setAttribute("class", "cart__item__content__settings");
    // Créer un element quantite
    let quantity = document.createElement("div");
    settings.appendChild(quantity);
    quantity.innerText = stock.quantite;

  }
}

// Appeler la fonction displayCart pour afficher le panier
displayCart();