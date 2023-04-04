let params = new URL(document.location).searchParams;
console.log(params);
let idKanap = params.get("id");
console.log(idKanap);

fetch(`http://localhost:3000/api/products/${idKanap}`)
  .then((res) => res.json()) 
  .then((objetProduits) => {
    displayKanap(objetProduits);
  })
  .catch((err) => {
    document.querySelector(".item__content").innerHTML = "<h1>Erreur 404, Oups une erreur est survenue</h1>";
    console.log (err);
  });

function displayKanap(resultatApi) {
  let article = resultatApi;
  console.log(resultatApi)
  // Affichage de l'image du produit
  let zoneArticleImG = document.querySelector(".item__img");
  if (zoneArticleImG !== null) {
    zoneArticleImG.innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}"><img>`;
  }
  // Affichage du titre et du prix du produit
  let zoneArticlePrice = document.querySelector(".item__content__titlePrice");
  if (zoneArticlePrice !== null) {
    zoneArticlePrice.innerHTML = `<h1 id="title">${article.name}</h1>
        <p>Prix : <span id="price">${article.price}</span>€</p>`;
  }
  // Affichage de la description du produit
  let zoneArticleDescription = document.querySelector(".item__content__description");
  if (zoneArticleDescription !== null) {
    zoneArticleDescription.innerHTML = `<p class="item__content__description__title">Description :</p>
        <p id="description">${article.description}</p>`;
  }
  // Affichage du sélecteur de couleurs
  let zoneArticleColor = document.querySelector("#colors");
  if (zoneArticleColor !== null) {
    zoneArticleColor.innerHTML = `<select name="color-select" id="colors">
    <option value="">--SVP, choisissez une couleur --</option>
    </select>`;
    // Boucle pour ajouter une option par couleur dans le tableau "colors"
    for (let colors = 0; colors < article.colors.length; colors++) {
      let colorOption = `<option value="${article.colors[colors]}">${article.colors[colors]}</option>`;
      zoneArticleColor.innerHTML += colorOption;
    }
  }
  let btn_envoyerPanier = document.querySelector("#addToCart");
  btn_envoyerPanier.addEventListener("click", () => {
    //Selection de l'id du formulaire
    const idForm = document.querySelector("#colors");
    console.log(idForm);
    // Mettre le choix de l'utilisateur dans une variable
    const choixForm = idForm.value;
    console.log(choixForm);
    // Selection de la quantité
    let choixQte = document.querySelector("#quantity").value;
    // Selection de la couleur
    let choixColor = document.querySelector("#colors").value;

    if ((choixQte <= 0 || choixQte > 100) && choixColor == "") {
      alert("Choisissez une couleur !");
      alert("Choisissez une quantité comprise entre 1 et 100");
    } else if (choixQte <= 0 || choixQte > 100) {
      alert("Choisissez une quantité comprise entre 1 et 100");
    } else if (choixColor == "") {
      alert("Choisissez une couleur !");
    } else {
      // Recuperation des données qui seront à stocker dans le panier
      let monProduit = {
        id: idKanap,
        colors: choixColor,
        quantite: choixQte,
        name: article.name,
        img: article.imageUrl,
        price: article.price,
      };
      console.log(monProduit);
    
      // Stockage de l'objet monproduit dans le local storage
      let monPanierStorage = localStorage;
      let monPanier = JSON.parse(monPanierStorage.getItem("monPanier"));
      console.log(monPanier);
    
      if (monPanier === null) {
        monPanier = [];
      }
    
      monPanier.push(monProduit);
      monPanierStorage.setItem("monPanier", JSON.stringify(monPanier));
      alert("Votre produit a été ajouté au panier");
    }
    // Ajoutez un console.log() pour afficher le contenu de monPanier après avoir mis à jour le localStorage
    console.log("Contenu de monPanier après mise à jour :", JSON.stringify(monPanier));
  })}