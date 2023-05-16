//Fetcher l'url de l'api
fetch("http://localhost:3000/api/products")
  // Quand tu as la reponse, tu me le donnes en json.
  .then((res) => res.json())
  //Resultat traité en json qui sera nommé "objetProduits"
  .then((objetProduits) => {
    displayKanap(objetProduits);
  })
  //
  .catch((err) => {
    document.querySelector(".titles").innerHTML =
      "<h1>Erreur 404, Oups une erreur est survenue</h1>";
    console.log(err);
  });
// Fonction d'affichage des produits sur la page d'accueil.
function displayKanap(resultatApi) {
  console.log(resultatApi);
  // Declaration de la variable pour pointer la zone d'article dans le html.
  let zoneArticle = document.querySelector("#items");
  // Boucle de recuperation des produits dans l'index.
  for (let article of resultatApi) {
    console.log(article);
    zoneArticle.innerHTML += `<a href="./product.html?id=${article._id}">
        <article>
          <img src="${article.imageUrl}" alt="${article.altTxt}">
          <h3 class="productName">${article.name}</h3>
          <p class="productDescription">${article.description}</p>
        </article>
      </a>`;
  }
}
