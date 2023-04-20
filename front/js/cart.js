let monPanier = JSON.parse(localStorage.getItem("monPanier")) || [];
console.log(monPanier);

// Définir les variables de protocole et de domaine pour les requêtes API
let protocole = "http://";
let monDomaine = "localhost:3000/api/products/";

// Fonction pour afficher le panier
function displayCart() {
  console.log(monPanier);
  /// Boucle pour récupérer les produits stockés dans le panier (monPanier)
  for (const stock of monPanier) {
    // Créer l'URL pour récupérer les informations du produit
    let url = `${protocole}${monDomaine}${stock.id}`;
    console.log(url);

    // Créer un élément article et le rajouter à la section cart__items
    let section = document.querySelector("#cart__items");
    let article = document.createElement("article");
    section.appendChild(article);

    // Définir les attributs de classe et de données pour l'article
    article.setAttribute("class", "cart__item");
    article.setAttribute("data-id", stock.id);
    article.setAttribute("data-color", stock.colors);

    // Créer un élément div pour l'image du produit et l'ajouter à l'article
    let div = document.createElement("div");
    article.appendChild(div);
    div.setAttribute("class", "cart__item__img");

    // Créer un élément img pour l'image du produit, définir ses attributs et l'ajouter à la div
    let img = document.createElement("img");
    div.appendChild(img);
    img.src = stock.img;
    img.setAttribute("alt", "Photographie d'un canapé");

    // Créer un élément div pour la description du produit et l'ajouter à l'article
    let content = document.createElement("div");
    article.appendChild(content);
    content.setAttribute("class", "cart__item__content");

    // Créer un élément div pour le titre et les informations du produit et l'ajouter à la div content
    let contentDescription = document.createElement("div");
    content.appendChild(contentDescription);
    contentDescription.setAttribute(
      "class",
      "cart__item__content__description"
    );

    // Créer un élément h2 pour le titre du produit, l'ajouter à la div contentDescription et définir son texte
    let title = document.createElement("h2");
    contentDescription.appendChild(title);
    title.innerText = stock.name;

    // Créer un élément p pour la couleur du produit, l'ajouter à la div contentDescription et définir son texte
    let colors = document.createElement("p");
    contentDescription.appendChild(colors);
    colors.innerText = stock.colors;

    // Créer un élément p pour le prix du produit, l'ajouter à la div contentDescription et définir son texte
    let price = document.createElement("p");
    contentDescription.appendChild(price);
    price.innerText = stock.price + " €";

    // Créer un élément div pour les réglages du produit et l'ajouter à la div content
    let settings = document.createElement("div");
    content.appendChild(settings);
    settings.setAttribute("class", "cart__item__content__settings");

    // Créer un élément div pour la quantité et l'ajouter à la div settings
    let settingQuantity = document.createElement("div");
    settings.appendChild(settingQuantity);
    settingQuantity.setAttribute(
      "class",
      "cart__item__content__settings__quantity"
    );

    // Créer un élément p pour afficher "Qté :", l'ajouter à la div settingQuantity et définir son texte
    let quantity = document.createElement("p");
    settingQuantity.appendChild(quantity);
    quantity.innerText = "Qté : ";

    // Créer un élément input pour la quantité du produit, l'ajouter à la div settingQuantity, définir sa classe
    let quantityInput = document.createElement("input");
    settingQuantity.appendChild(quantityInput);
    quantityInput.setAttribute("class", "itemQuantity");
    quantityInput.value = stock.quantite;
    //
    let settingDelete = document.createElement("div");
    settings.appendChild(settingDelete);
    settingDelete.setAttribute(
      "class",
      "cart__item__content__settings__delete"
    );
    //
    let itemDelete = document.createElement("p");
    settingDelete.appendChild(itemDelete);
    itemDelete.setAttribute("class", "deleteItem");
    itemDelete.innerHTML = "Supprimer";
    console.log("stock.colors:", stock.colors);
  }
}

// Appeler la fonction displayCart pour afficher le panier
displayCart();

console.log(monPanier);

// Calcul de la quantité total de mon panier
function totalArticle() {
  let calculQ = [];

  for (q = 0; q < monPanier.length; q++) {
    const Qte = parseInt(monPanier[q].quantite);
    calculQ.push(Qte);
    let totalQ = calculQ.reduce((a, b) => a + b, 0);
    const prixTotalQ = document.getElementById("totalQuantity");
    prixTotalQ.textContent = totalQ;
  }
}
totalArticle();
// Modification de la quantité

function modifierQuantite() {
  // Obtenir les éléments input avec la classe "itemQuantity"
  let inputQ = document.querySelectorAll(".itemQuantity");
  // Récupérer le panier d'achat à partir du localStorage ou créer un tableau vide s'il n'existe pas
  let monPanier = JSON.parse(localStorage.getItem("monPanier")) || [];

  for (let k = 0; k < inputQ.length; k++) {
    inputQ[k].addEventListener("change", (event) => {
      console.log("change event triggered");

      let id = inputQ[k].closest("article").dataset.id;
      console.log("id:", id); // Déplacez cette ligne ici.

      let colors = inputQ[k].closest("article").dataset.color;
      console.log("colors:", colors); // Déplacez cette ligne ici.

      let quantite = parseInt(event.target.value);

      let kanapFind = monPanier.find((item) => {
        return item.id == id && item.colors == colors;
      });

      // Vérifier si l'article est trouvé
      if (kanapFind) {
        // Mettre à jour la quantité de l'article
        console.log(kanapFind);
        kanapFind.quantite = quantite;
        // Enregistrer les données modifiées dans le localStorage
        localStorage.setItem("monPanier", JSON.stringify(monPanier));
        // Recharger la page
        window.location.reload();
      } else {
        // Afficher un message d'erreur si l'article n'est pas trouvé
        alert("Erreur");
      }
    });
  }
}

modifierQuantite();

function deleteQuantite() {
  let buttonDelete = document.querySelectorAll(".deleteItem");
  let monPanier = JSON.parse(localStorage.getItem("monPanier")) || [];

  for (let x = 0; x < buttonDelete.length; x++) {
    buttonDelete[x].addEventListener("click", function () {
      let id = buttonDelete[x].closest("article").dataset.id;
      console.log("id:", id);

      let colors = buttonDelete[x].closest("article").dataset.color;
      console.log("colors:", colors);

      // Trouvez et supprimez l'article du panier monPanier
      monPanier = monPanier.filter((item) => {
        return !(item.id === id && item.colors === colors);
      });

      // Enregistrer les données modifiées dans le localStorage
      localStorage.setItem("monPanier", JSON.stringify(monPanier));
      // Recharger la page
      window.location.reload();
    });
  }
}

deleteQuantite();
