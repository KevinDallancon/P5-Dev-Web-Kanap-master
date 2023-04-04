let monPanier= JSON.parse(localStorage.getItem("monPanier"));
console.log(monPanier);
let protocole = "http://";
let monDomaine = "localhost:3000/api/products";




// Afficher le panier
function displayCart(){
// Boucle de récuperation des produits stockés dans le panier storage
    for (const stock of monPanier){

        let url = `${protocole}${monDomaine}/${stock.id}`;
        const reponse = fetch(url);

        let section = document.querySelector('#cart__items');
        let article = document.createElement('article');

        section.appendChild(article);
        article.setAttribute("class", "cart__item");

        article.setAttribute('data-id', 'stock.id');
        // Initialisation de la variable id
        let id = stock.id;

        article.setAttribute("data-color", "stock.color");
        
        let div = document.createElement('div');
        article.appendChild(div);
        div.setAttribute("class", "cart__item__img");
        
        let img = document.createElement('img');
        div.appendChild(img);
        div.setAttribute("src", "");
        img.src = stock.img;
        img.setAttribute("alt", "Photographie d'un canapé");
    }
}
displayCart();
