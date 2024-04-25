/*const smileyModal = document.querySelector('.smiley-modal');
const completeButton = document.querySelector('.complete-button');

const INPUTS = document.querySelectorAll('#smileys input');
const updateValue = (e) =>
  (document.querySelector('#result').innerHTML = e.target.value);

INPUTS.forEach((el) => el.addEventListener('click', (e) => updateValue(e)));

completeButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  smileyModal.close();
});*/

let cartIcon = document.querySelector("#cart-icon")
let cart = document.querySelector(".shopping-cart")
let closeCart = document.querySelector("#close-cart")


//Opening Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};


//Closing Cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

//Cart Working
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

//Making Function

function ready () {
  //Remove item from cart
  var removeCartButton = document.getElementsByClassName("cart-removing")
  console.log(removeCartButton)
  for (var i = 0; i < removeCartButton.length; i++){
    var button = removeCartButton [i]
    button.addEventListener('click', removeCartItem)
  }
  //Change Quantity
  var quantityInputs = document.getElementsByClassName('cart-quantity')
  for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs [i];
    input.addEventListener("change", quantityChanged)
  }

  // Add to cart
  var addCart = document.getElementById('cart-icon')
  for (var i = 0; i < addCart.length; i++){
    var button = addCart[i]
    button.addEventListener("click", addCartClicked)
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

//Add to cart pt.2
function addCartClicked(event){
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName('cart-product-title')[0].innerText
  var price = shopProducts.getElementsByClassName('price')[0].innerText
  console.log(title)
}

//Update Total
function updateTotal(){
  var cartContent = document.getElementsByClassName('cart-content')[0]
  var cartBoxes = cartContent.getElementsByClassName('cart-box')
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes[i]
    var priceElement = cartBox.getElementsByClassName('cart-price') [0]
    var quantityElement = cartBox.getElementsByClassName('cart-quantity') [0]
    var price = parseFloat(priceElement.innerText.replace("€", ""))
    var quantity = quantityElement.value;
    total = total + (price * quantity);

    //If price has cents
    total=Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price') [0].innerText = "€" + total;
  }
}
