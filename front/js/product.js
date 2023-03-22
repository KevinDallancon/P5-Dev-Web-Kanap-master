// Récupération de l'id dans l'url
const url_id = window.location.search; // Récupère la partie de l'url après le "?"
console.log(url_id);

// Utilisation de l'API URLSearchParams pour extraire l'id de l'url
const urlSearchParams = new URLSearchParams(url_id);
console.log(urlSearchParams);

const recupId = urlSearchParams.get("id"); // Récupère la valeur de l'id dans l'url
console.log(recupId);

// Appel à l'API pour récupérer les informations du produit en fonction de son id
fetch(`http://localhost:3000/api/products/${recupId}`)
  .then((res) => res.json()) // Convertit la réponse en format JSON
  .then((objetProduits) => {
    // Affiche le produit dans la page HTML avec la fonction displayKanap
    displayKanap(objetProduits);
  })
  .catch((err) => {
    console.log(err); // Affiche une erreur s'il y a un problème avec l'appel API
  });

function displayKanap(index) {
  let article = index;

  // Affichage de l'image du produit
  let zoneArticle1 = document.querySelector(".item__img");
  if (zoneArticle1 !== null) {
    zoneArticle1.innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}"><img>`;
  }

  // Affichage du titre et du prix du produit
  let zoneArticle2 = document.querySelector(".item__content__titlePrice");
  if (zoneArticle2 !== null) {
    zoneArticle2.innerHTML = `<h1 id="title">${article.name}</h1>
        <p>Prix : <span id="price">${article.price}</span>€</p>`;
  }

  // Affichage de la description du produit
  let zoneArticle3 = document.querySelector(".item__content__description");
  if (zoneArticle3 !== null) {
    zoneArticle3.innerHTML = `<p class="item__content__description__title">Description :</p>
        <p id="description">${article.description}</p>`;
  }

  // Affichage du sélecteur de couleurs
  let zoneArticle4 = document.querySelector("#colors");
  if (zoneArticle4 !== null) {
    // Ajout d'une balise select avec une option par couleur
    zoneArticle4.innerHTML = `<select name="color-select" id="color-select">
    <option value="">--SVP, choisissez une couleur --</option>
    </select>`;
    // Boucle pour ajouter une option par couleur dans le tableau "colors"
    for (let colors = 0; colors < article.colors.length; colors++) {
      let colorOption = `<option value="${article.colors[colors]}">${article.colors[colors]}</option>`;
      zoneArticle4.innerHTML += colorOption;
    }
  }
}

