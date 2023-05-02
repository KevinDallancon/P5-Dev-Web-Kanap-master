
Vous
Christophe Gianorsi
14:14
Session de mentorat






0
Chat
Christophe Gianorsi
14:16
let modifQty = document.querySelectorAll(".itemQuantity"); // Selection de l'input modif qty panier

function modifQtyEle() {
  for (let k = 0; k < modifQty.length; k++) {
    modifQty[k].addEventListener("change", (event) => {
      // pour chaque input...
      

      let id = modifQty[k].closest("article").dataset.id; // id de chaque canapé selon input
      let color = modifQty[k].closest("article").dataset.color; // color de chaque canapé selon input

      if (modifQty[k].value >= 1) {
        let kanapFind = panierStorage.find((item) => {
          return item.id == id && item.color == color;
        });
        kanapFind.quantite = parseInt(event.target.value);
        localStorage.setItem("monPanier", JSON.stringify(panierStorage)); // Sauvegarde et sérialise

        window.location.reload();
      } else {
        //Sinon si qty à 0 =>suppr canapé
        panierStorage = panierStorage.filter(
          (elt) => elt.id !== id || elt.color !== color
        );

        localStorage.setItem("monPanier", JSON.stringify(panierStorage)); // Sauvegarde et sérialise

        window.location.reload();
      }
    });
  }
}
modifQtyEle();


let supprimer = document.querySelectorAll(".deleteItem");  // Sélection de l'input supprimer élément du panier

function supprEle() {
  for (let s = 0; s < supprimer.length; s++) {
    supprimer[s].addEventListener("click", (event) => {
      event.preventDefault();

      let supprId = supprimer[s].closest("article").dataset.id; // id de chaque canapé selon input
      let supprColor = supprimer[s].closest("article").dataset.color; // color de chaque canapé selon input

      // Nouveau panier avec ID et color
      panierStorage = panierStorage.filter(
        (elt) => elt.id !== supprId || elt.color !== supprColor
      );

      localStorage.setItem("monPanier", JSON.stringify(panierStorage)); // Sauvegarde et sérialise

      window.location.reload();
    });
  }
}
supprEle();

/// code kevin : 


