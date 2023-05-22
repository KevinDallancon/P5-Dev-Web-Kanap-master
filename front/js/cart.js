let monPanier = JSON.parse(localStorage.getItem("monPanier")) || [];

// Définir les variables de protocole et de domaine pour les requêtes API
let protocole = "http://";
let monDomaine = "localhost:3000/api/products/";

// Fonction pour afficher le panier
function displayCart() {
  let totalPrix = 0;
  let totalQ = 0;
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

        //--------- total des articles et du prix total ---///
        const Qte = parseInt(stock.quantite);
        totalQ += Qte;
        totalPrix += productData.price * Qte;

        // Afficher le total des articles et le prix total
        const totalQte = document.getElementById("totalQuantity");
        totalQte.textContent = totalQ;
        const PrixQte = document.getElementById("totalPrice");
        PrixQte.textContent = totalPrix;

        // ---------- Supprimer une quantité -----------//

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

        // Récupération de tous les éléments du DOM avec la classe "itemQuantity" dans le tableau inputQ
        let inputQ = document.querySelectorAll(".itemQuantity");

        // Définition de la fonction modifierQuantite
        function modifierQuantite() {
          // Boucle pour traiter tous les éléments de inputQ
          for (let k = 0; k < inputQ.length; k++) {
            // Ajout d'un écouteur d'événement sur chaque élément de inputQ pour détecter un changement
            inputQ[k].addEventListener("change", (event) => {
              // Annulation de l'action par défaut du navigateur lors du déclenchement de l'événement
              event.preventDefault();
              // Récupération de l'id et de la couleur du produit associé à l'input modifié
              let id = inputQ[k].closest("article").dataset.id;
              let colors = inputQ[k].closest("article").dataset.color;

              // Récupération de la nouvelle quantité
              let quantite = parseInt(event.target.value);

              // Recherche du produit dans le panier
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

//------------------GESTION FORMULAIRE ---------------------------------//

const btnEnvoiFormulaire = document.querySelector("#order");

btnEnvoiFormulaire.addEventListener("click", (e) => {
  e.preventDefault();

  // Vérifier la validité des champs de formulaire
  function controleForm() {
    // Expressions régulières pour valider les champs
    const regexMail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/g;
    const regexPrenomNom = /^[A-Za-zÀ-ÿ]{3,20}$/; // Pas de chiffres
    const regexAddress = /^[A-Za-zÀ-ÿ0-9\s#,-]{1,100}$/; // Chiffres autorisés
    const regexCity = /^[A-Za-zÀ-ÿ\s-]{1,50}$/; // Pas de chiffres

    // Message d'erreur pour les champs
    const firstNameError = document.querySelector("#firstNameErrorMsg");
    const lastNameError = document.querySelector("#lastNameErrorMsg");
    const addressError = document.querySelector("#addressErrorMsg");
    const cityError = document.querySelector("#cityErrorMsg");
    const emailError = document.querySelector("#emailErrorMsg");

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

    // Creation d'un tableau pour stocker les messages d'erreurs
    let errorMsg = [];

    if (
      contact.firstName.trim() === "" ||
      !regexPrenomNom.test(contact.firstName)
    ) {
      firstNameError.innerHTML = "Merci de renseigner un prénom valide";
      errorMsg.push(firstNameError.innerHTML);
    }

    if (
      contact.lastName.trim() === "" ||
      !regexPrenomNom.test(contact.lastName)
    ) {
      lastNameError.innerHTML = "Merci de renseigner un nom de famille valide";
      errorMsg.push(lastNameError.innerHTML);
    }

    if (contact.address.trim() === "" || !regexAddress.test(contact.address)) {
      addressError.innerHTML = "Merci de renseigner une adresse valide";
      errorMsg.push(addressError.innerHTML);
    }

    if (contact.city.trim() === "" || !regexCity.test(contact.city)) {
      cityError.innerHTML = "Merci de renseigner une ville valide";
      errorMsg.push(cityError.innerHTML);
    }

    if (contact.email.trim() === "" || !regexMail.test(contact.email)) {
      emailError.innerHTML = "Veuillez saisir une adresse e-mail valide !";
      errorMsg.push(emailError.innerHTML);
    }
    // Si aucune erreur dans le tableau errorMsg alors tu peux envoyer la commande
    if (errorMsg.length === 0) {
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
          // Rediriger l'utilisateur vers la page de confirmation
          window.location.href = `./confirmation.html?orderId=${data.orderId}`;
        })
        .catch((error) => {
          // Traiter les erreurs éventuelles
          alert("La réponse du serveur est ko");
        });
    }
  }
  controleForm();
});
