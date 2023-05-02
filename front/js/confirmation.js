const orderId = localStorage.getItem("orderId")
console.log(orderId);

let numeroCommande = document.getElementById("orderId");
numeroCommande.textContent = orderId;
console.log(numeroCommande);