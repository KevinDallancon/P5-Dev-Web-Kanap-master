




//Fetcher l'url de l'api / recuperer le json - appeler l'objet produit




fetch('http://localhost:3000/api/products')

//Ne pas oublier de l'inserer dans la console.log, displayproduct ==> Prend le retour du json fecth.

    .then(response => {
        if(!response.ok){
            throw new Error ("La réponse du serveur n'est pas ok"); 
        } 
        return response.json();
    })
    .then(data => {
        console.log('Données récupérées avec succès', data);
      })
//inserer le catch dans le H1 5const list = document.getElementById("list");
    .catch(error => {
        console.error('Erreur lors de la récupération des données', error);
    });
    
    




//list.innerHTML += `<li><a href="#">Item ${list.children.length + 1}</a></li>`;°

//Fonction ( nommer display product ) d'affichage des produits ( dom )

/*
Prendre l'index du tableau pour faire une boucle for let produits of index { a chaque fois que tu trouves une longueur i++} et le resultat de cette boucle : ( definir une variable let mazonedeproduit = document.queryselector) ("#items");   let article for index += href="./product.html?id=42"
*/
