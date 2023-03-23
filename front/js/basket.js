const { get } = require("http");

function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
        return[];
    } else {
        return JSON.parse(basket);
    }
}

function addBasket(article) {
    let basket = getBasket();
    let foundArticle = basket.find(p => p.id == article.id);
    if(foundArticle != undefined){
        foundArticle.quantity++;
    }else{
        article.quantity = 1; 
        basket.push(article);
    }
    saveBasket(basket);
}

function removeFromBasket(article){
    let basket = getBasket();
    basket = basket.filter(p => p.id != article.id);
    saveBasket(basket);

}

function changeQuantity(article,quantity){
    let basket = getBasket();
    let foundArticle = basket.find(p => p.id == product.id);
    if (foundArticle != undefined) {
        foundArticle.quantity += quantity;
        if (foundArticle.quantity <=0) {
            removeFromBasket(foundArticle);
        }else {
            saveBasket(basket);
        }
    }
   
}