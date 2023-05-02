let monPanier = JSON.parse(localStorage.getItem("monPanier")) || [];

// Définir les variables de protocole et de domaine pour les requêtes API
let protocole = "http://";
let monDomaine = "localhost:3000/api/products/";

// Fonction pour afficher le panier
function displayCart() {
  let totalPrix = 0;
  /// Boucle pour récupérer les produits stockés dans le panier (monPanier)
  for (const stock of monPanier) {
    // Créer l'URL pour récupérer les informations du produit
    let url = `${protocole}${monDomaine}${stock.id}`;
    // Fetcher l'url de l'api
    fetch(url)
      .then((res) => res.json())
      .then((productData) => {
        // Utilisez productData pour créer les éléments HTML ici
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
        img.src = productData.imageUrl; // Utilisez l'image de l'API
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

        let name = document.createElement("h2");
        contentDescription.appendChild(name);
        name.innerText = productData.name;
        // Créer un élément p pour la couleur du produit, l'ajouter à la div contentDescription et définir son texte
        let color = document.createElement("p");
        contentDescription.appendChild(color);
        color.innerText = stock.colors;

        let price = document.createElement("p");
        contentDescription.appendChild(price);
        price.innerText = productData.price + " €";

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
        // ------------- Total d'article ----------//

        let calculQ = [];

        for (q = 0; q < monPanier.length; q++) {
          const Qte = parseInt(monPanier[q].quantite);
          calculQ.push(Qte);
        }
        let totalQ = calculQ.reduce((a, b) => a + b, 0);
        const totalQte = document.getElementById("totalQuantity");
        totalQte.textContent = totalQ;
        //---------------Calcul du prix total------//

        for (q = 0; q < monPanier.length; q++) {
          const Qte = parseInt(stock.quantite);
          console.log(Qte);
          const Prix = productData.price;
          console.log(Prix);
        }
        const PrixQte = document.getElementById("totalPrice");
        PrixQte.textContent = totalPrix;

        // ----- Modification de la quantité -----------//
        let inputQ = document.querySelectorAll(".itemQuantity");
        console.log(inputQ);
        function modifierQuantite() {
          for (let k = 0; k < inputQ.length; k++) {
            inputQ[k].addEventListener("change", (event) => {
              event.preventDefault();
              let id = inputQ[k].closest("article").dataset.id;
              let colors = inputQ[k].closest("article").dataset.color;

              let quantite = parseInt(event.target.value);

              let kanapFind = monPanier.find((item) => {
                return item.id == id && item.colors == colors;
              });
              console.log(kanapFind);
              // Vérifier si l'article est trouvé
              if (kanapFind && kanapFind.quantite >= 1) {
                // Mettre à jour la quantité de l'article
                kanapFind.quantite = quantite;
                // Enregistrer les données modifiées dans le localStorage
                localStorage.setItem("monPanier", JSON.stringify(monPanier));
                // Recharger la page
                window.location.reload();
              } else {
                // Afficher un message d'erreur si l'article n'est pas trouvé
                alert("Erreur de modification de quantite");
              }
            });
          }
        }
        modifierQuantite();
      })
      .catch((err) => {
        console.error("Ceci est un message d'erreur", err);
      });
  }
}

displayCart();

function deleteQuantite() {
  let buttonDelete = document.querySelectorAll(".deleteItem");
  console.log(buttonDelete);
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
//------------------GESTION FORMULAIRE ---------------------------------//

const btnEnvoiFormulaire = document.querySelector("#order");
console.log(btnEnvoiFormulaire);

btnEnvoiFormulaire.addEventListener("click", (e) => {
  e.preventDefault();

  // Vérifier la validité des champs de formulaire
  function controleForm() {
    // Expression régulière pour valider l'e-mail
    const regexMail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/g;
    // Expression régulière pour valider le prénom et le nom
    const regexPrenomNom = /^[A-Za-zÀ-ÿ]{3,20}$/;

    // Creation d'une class
    class classContact {
      constructor() {
        this.firstName = document.querySelector("#firstName").value;
        this.lastName = document.querySelector("#lastName").value;
        this.address = document.querySelector("#address").value;
        this.city = document.querySelector("#city").value;
        this.email = document.querySelector("#email").value;
      }
    }
    // Appel de l'instance de class formulaire pour créer l'objet

    const contact = new classContact();
    console.log(contact);

    if (contact.firstName.trim() === "") {
      alert("Le champ 'Prénom' est obligatoire.");
    } else if (!regexPrenomNom.test(contact.firstName)) {
      alert(
        "Veuillez respecter une longueur minimale de 3 caractères et une longueur maximale de 20 caractères pour le prénom !"
      );
    } else if (contact.lastName.trim() === "") {
      alert("Le champ 'Nom' est obligatoire.");
    } else if (!regexPrenomNom.test(contact.lastName)) {
      alert(
        "Veuillez respecter une longueur minimale de 3 caractères et une longueur maximale de 20 caractères pour le nom !"
      );
    } else if (contact.address.trim() === "") {
      alert("Le champ 'Adresse' est obligatoire.");
    } else if (contact.city.trim() === "") {
      alert("le champ 'Ville' est obligatoire");
    } else if (contact.email.trim() === "") {
      alert("Le champ 'Email' est obligatoire.");
    } else if (!regexMail.test(contact.email)) {
      alert("Veuillez saisir une adresse e-mail valide !");
    } else {
      alert("votre commande est envoyé");

      // Mettre l'objet formulaireValues dans le localStorage
      localStorage.setItem("contact", JSON.stringify(contact));
      localStorage.setItem("monPanier", JSON.stringify(monPanier));

      let products = [];
      monPanier.forEach((produit) => {
        products.push(produit.id);
      });
      console.log(products);

      // Envoyer la requête POST au serveur
      fetch(" http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact, products }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Traiter la réponse du serveur (par exemple, afficher un message de succès)
          alert("La réponse du serveur est ok");
          console.log(data);
          // Enregistrer l'identifiant de commande dans le localStorage
          localStorage.setItem("orderId", data.orderId);
          // Rediriger l'utilisateur vers la page de confirmation
          window.location.href = "confirmation.html";
        })
        .catch((error) => {
          // Traiter les erreurs éventuelles
          alert("La réponse du serveur est ko");
        });
    }
  }
  e.preventDefault();
  controleForm();
});
