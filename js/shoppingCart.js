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
    button.addEventListener('click' removeCartItem)
  }
}
