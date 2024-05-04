'use strict';
/*
const payAmountBtn = document.querySelector('#payAmount');
const decrementBtns = document.querySelectorAll('.decrement');
const incrementBtns = document.querySelectorAll('.increment');
const priceElems = document.querySelectorAll('.price');
const totalElem = document.querySelector('#total');
const quantityElems = document.querySelectorAll('.quantity');
const subtotalElem = document.querySelector('#subtotal');
const taxElem = document.querySelector('#tax');

// Add event listeners to each increment and decrement button
incrementBtns.forEach((incrementBtn, index) => {
  incrementBtn.addEventListener('click', function () {
    let increment = parseInt(quantityElems[index].textContent);
    increment++;
    quantityElems[index].textContent = increment;
    totalCalc(); // Call totalCalc after updating quantity
  });
});

decrementBtns.forEach((decrementBtn, index) => {
  decrementBtn.addEventListener('click', function () {
    let decrement = parseInt(quantityElems[index].textContent);
    decrement = decrement <= 1 ? 1 : decrement - 1;
    quantityElems[index].textContent = decrement;
    totalCalc(); // Call totalCalc after updating quantity
  });
});

// Calculate total and update elements
const totalCalc = function () {
  const taxRate = 0.05;
  let subtotal = 0;
  let totalTax = 0;
  let total = 0;

  // Loop through each product to calculate subtotal
  quantityElems.forEach((quantityElem, index) => {
    const quantity = parseInt(quantityElem.textContent);
    const price = parseFloat(priceElems[index].textContent.replace('€', ''));
    const productTotal = quantity * price;
    subtotal += productTotal;
  });

  // Update subtotal element
  subtotalElem.textContent = subtotal.toFixed(2);

  // Calculate total tax
  totalTax = subtotal * taxRate;
  taxElem.textContent = totalTax.toFixed(2);

  // Calculate total
  total = subtotal + totalTax;
  totalElem.textContent = total.toFixed(2);
  payAmountBtn.textContent = total.toFixed(2);
};

// Initial calculation when the page loads
totalCalc();
*/

let checkout = document.querySelector(".container")


//Cart Working
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready () {
  //Remvoe item from cart
  var removeCartButton = document.getElementsByClassName("product-close-btnn")
  console.log(removeCartButton)
  for (var i = 0; i < removeCartButton.length; i++) {
    var button = removeCartButton [i]
    button.addEventListener('click', removeCartItem)
  }

  //Change Quantity
  var quantityInputs = document.getElementsByClassName('#quantity')
  for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs [i];
    input.addEventListener("change", quantityChanged)
  }
}

//Remove items from cart pt.2
function removeCartItem(event){
  var buttonClicked = event.target
  buttonClicked.parentElement.remove()
  updateTotal();
}

// Change quantity pt.2
function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0){
    input.value = 1;
  }
  updateTotal()
}

//Update Total
function updateTotal(){
  var cartContent = document.getElementsByClassName('cart')[0]
  var cartBoxes = cartContent.getElementsByClassName('cart-item-box')
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes[i]
    var priceElement = cartBox.getElementsByClassName('price') [0]
    var quantityElement = cartBox.getElementsByClassName('#quantity') [0]
    var price = parseFloat(priceElement.innerText.replace("€", ""))
    var quantity = quantityElement.value;
    total = total + (price * quantity);

    //If price has cents
    total=Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price') [0].innerText = "€" + total;
  }
}
