'use strict';

const url = 'https://10.120.32.54/app/api/v1';
const imageUrl = 'https://10.120.32.54/app/uploads/';

const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const logoutLink = document.querySelector('.logout-link');
const adminLink = document.querySelector('.admin-link');
const accountLink = document.querySelector('.account-link');

const loginDialog = document.querySelector('.login-modal');
const registerDialog = document.querySelector('.registration-modal');

const fetchData = async (url, options = {}) => {
  console.log('fetching data from url: ', url);
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    console.log('json', json);
    if (json.message) {
      throw new Error(json.message);
    }
    throw new Error(`Error ${response.status} occured`);
  }
  return json;
};

const getAllCategories = async () => {
  try {
    const response = await fetch(`${url}/categories`);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error fetching categories');
    }
  } catch (error) {
    console.error(error);
  }
};

const getAllProducts = async () => {
  try {
    const response = await fetch(`${url}/products`);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error fetching products');
    }
  } catch (error) {
    console.error(error);
  }
};

let meats = [];
let frozenFoods = [];
let hotDrinks = [];
let fruits = [];
let vegetables = [];
let cheeses = [];
let dairyProducts = [];
let sweetProducts = [];
let saltyProducts = [];

let allCategories = null;
let allProducts = null;

let productsByCategory = {};

let selectedFoods = [];
let foods = [];

(async function fetchAllData() {
  try {
    allCategories = await getAllCategories();
    allProducts = await getAllProducts();

    allCategories.forEach((category) => {
      productsByCategory[category.categoryId] = allProducts.filter(
        (product) => product.categoryId === category.categoryId
      );
      foods.push(category.name.toLowerCase());
    });

    selectedFoods = allProducts;

    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.classList.add('button-option');
    allButton.classList.add('selected');
    document.querySelector('.aside-options').appendChild(allButton);

    allCategories.forEach((category) => {
      const buttonElement = document.createElement('button');
      buttonElement.textContent = category.name;
      buttonElement.classList.add('button-option');
      buttonElement.dataset.categoryId = category.categoryId;

      if (category.file !== null) {
        const imageElement = document.createElement('img');

        imageElement.src = imageUrl + category.file;
        imageElement.alt = category.name;
        imageElement.classList.add('category-image');
        buttonElement.prepend(imageElement);
      }

      document.querySelector('.aside-options').appendChild(buttonElement);
    });

    const buttons = Array.from(
      document.querySelectorAll('.button-option')
    ).slice(1);

    allButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      buttons.forEach((button) => {
        button.classList.remove('selected');
      });

      allButton.classList.add('selected');

      selectedFoods = allProducts;
      displayFoods(selectedFoods);
      console.log('All products:', selectedFoods);
    });

    buttons.forEach((button) => {
      button.addEventListener('click', (evt) => {
        evt.preventDefault();

        buttons.forEach((button) => {
          button.classList.remove('selected');
          allButton.classList.remove('selected');
        });

        button.classList.add('selected');

        selectedFoods = [];

        selectedFoods = productsByCategory[button.dataset.categoryId];

        if (selectedFoods.length === 0) {
          foodsDiv.innerHTML =
            '<p>No products available for this category.</p>';
        } else {
          displayFoods(selectedFoods);
        }
      });

      const searchBar = document.querySelector('.search-input');

      searchBar.addEventListener('input', (evt) => {
        const searchValue = evt.target.value.toLowerCase();

        const filteredProducts = selectedFoods.filter((product) => {
          return product.name.toLowerCase().includes(searchValue);
        });
        displayFoods(filteredProducts);
      });
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

const displayFoods = (foods) => {
  foodsDiv.innerHTML = '';

  foods.forEach((food) => {
    const articleElement = document.createElement('article');
    const titleElement = document.createElement('h3');
    const descriptionElement = document.createElement('p');
    const priceElement = document.createElement('p');
    const imageElement = document.createElement('img');

    imageElement.src = imageUrl + food.file;
    imageElement.alt = food.name;

    titleElement.textContent = food.name;
    descriptionElement.textContent = food.description;
    priceElement.textContent = food.price + ' €';

    priceElement.style.fontWeight = 'bold';

    imageElement.style.maxWidth = '250px';
    imageElement.style.maxHeight = '250px';

    articleElement.addEventListener('click', (evt) => {
      evt.preventDefault();

      foodInfoContent.innerHTML = '';

      const closeButton = document.createElement('button');
      closeButton.textContent = 'X';
      closeButton.classList.add('close-button');

      const foodInfoTitle = document.createElement('h2');
      foodInfoTitle.textContent = food.name;

      const foodInfoDescription = document.createElement('p');
      foodInfoDescription.textContent = food.description;

      const foodInfoPrice = document.createElement('p');
      foodInfoPrice.textContent = food.price + ' €';
      foodInfoPrice.style.fontWeight = 'bold';

      const foodInfoImage = document.createElement('img');
      foodInfoImage.src = imageUrl + food.file;
      foodInfoImage.alt = food.name;

      const buyButton = document.createElement('button');
      buyButton.classList.add('modal-buy-button');
      buyButton.textContent = 'Add to order';

      const quantityElement = document.createElement('div');
      quantityElement.classList.add('quantity-element');

      const minusButton = document.createElement('button');
      minusButton.textContent = '-';
      minusButton.classList.add('quantity-button');

      const quantityNumber = document.createElement('p');
      quantityNumber.textContent = '1';
      quantityNumber.classList.add('quantity-number');

      const plusButton = document.createElement('button');
      plusButton.textContent = '+';
      plusButton.classList.add('quantity-button');

      quantityElement.appendChild(minusButton);
      quantityElement.appendChild(quantityNumber);
      quantityElement.appendChild(plusButton);

      let quantity = parseInt(quantityNumber.textContent);

      minusButton.addEventListener('click', (evt) => {
        evt.preventDefault();

        if (quantity > 1) {
          quantity--;
          quantityNumber.textContent = quantity;
        } else {
          quantity = 1;
        }
      });

      plusButton.addEventListener('click', (evt) => {
        evt.preventDefault();

        quantity++;
        quantityNumber.textContent = quantity;
      });

      buyButton.addEventListener('click', async (evt) => {
        evt.preventDefault();

        addProductToCart(food.productId, quantity, food.price, imageUrl + food.file, food.name);
      });

      closeButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        foodInfo.close();
      });

      foodInfoContent.appendChild(closeButton);
      foodInfoContent.appendChild(foodInfoImage);
      foodInfoContent.appendChild(foodInfoTitle);
      foodInfoContent.appendChild(foodInfoDescription);
      foodInfoContent.appendChild(foodInfoPrice);
      foodInfoContent.appendChild(quantityElement);
      foodInfoContent.appendChild(buyButton);

      foodInfo.showModal();
    });

    articleElement.appendChild(imageElement);
    articleElement.appendChild(titleElement);
    articleElement.appendChild(descriptionElement);
    articleElement.appendChild(priceElement);
    foodsDiv.appendChild(articleElement);
  });
};

const foodInfo = document.querySelector('.food-info');
const foodInfoContent = document.querySelector('.food-info-content');

const foodsDiv = document.querySelector('.foods');

let products = [];

const fetchAndAddProducts = async () => {
  try {
    const response = await fetch(`${url}/products`);
    const data = await response.json();

    if (response.status === 200) {
      products.push(...data);
    } else {
      console.error('Error');
    }
  } catch (error) {
    console.error(error);
  }
};

const checkIfAdmin = async (token) => {
  try {
    const response = await fetch(url + '/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();

    if (json.customer.role === 'admin') {
      adminLink.style.display = 'block';
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


//Shoppingcart js
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
  //console.log(removeCartButton)
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
  //Buy button work
  document
    .getElementsByClassName('btn-buy')[0]
    .addEventListener('click', buyButtonClicked)
}
// Buy Button

function buyButtonClicked() {
  // Redirect to the checkout page
  window.location.href = 'checkout.html';
}

//Remove product from session storage when remove button is pressed
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  const userToken = localStorage.getItem('token') || sessionStorage.getItem('token');
  localStorage.removeItem(`shoppingCart_${userToken}`);
  updateTotal();
  if (!userToken) {
    console.error('User token not found');
    return;
}



//Remove items from cart pt.2


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
  var price = shopProducts.getElementsByClassName('cart-price')[0].innerText
  var productImg = shopProducts.getElementsByClassName('cart-img')[0].innerText
  addProductToCart(title, price, productImg)
  updateTotal()
}


//end of shoppingcart js



const addProductToCart = (productId, quantity, price, imageUrl, name) => {
  var cartShopBox = document.createElement("div")
  console.log(name)
  cartShopBox.classList.add('cart-box')
  var cartItems = document.getElementsByClassName('cart-content')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-product-title')
  for (var i = 0; i < cartItemNames.length; i++){
    if (cartItemNames[i].innerText == title){
      alert("You have already add this item to cart")
      return;
    }
  }
  var cartBoxContent =
    `<div class="cart-box">\n` +
    `    <img src="${imageUrl}" class="cart-img" alt="Coffee">\n` +
    `         <div class="detail-box">\n` +
    `            <div class="cart-product-title">${name}</div>\n` +
    `            <div class="cart-price">${price}€</div>\n` +
    `            <input type="number" value="${quantity}" class="cart-quantity">\n` +
    `         </div>\n` +
    `          <ion-icon name="trash-outline" class="cart-removing"></ion-icon>\n` +
    ` </div>`;

  cartShopBox.innerHTML = cartBoxContent
  cartItems.append(cartShopBox)
  cartShopBox.getElementsByClassName('cart-removing')[0].addEventListener('click', removeCartItem)
  cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
  var cart
  // Get the user token from localStorage or sessionStorage
  const userToken =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  if (!userToken) {
    alert('You need to login to buy products');
    return;
  }

  let existingShoppingCartData =
    JSON.parse(sessionStorage.getItem(`shoppingCart_${userToken}`)) || [];

  // Check if the product already exists in the shopping cart data
  const existingProductIndex = existingShoppingCartData.findIndex(
    (item) => item.productId === productId
  );
  if (existingProductIndex !== -1) {
    // If the product already exists, update its quantity and price
    existingShoppingCartData[existingProductIndex].quantity += quantity; // Update quantity
    existingShoppingCartData[existingProductIndex].price += price * quantity; // Update total price
    existingShoppingCartData[existingProductIndex].imageUrl = imageUrl; // Update image URL
  } else {
    // If the product does not exist, add it to the shopping cart data
    existingShoppingCartData.push({productId, quantity, price: price * quantity, imageUrl, name});
  }

  // Store the updated shopping cart data back into sessionStorage
  sessionStorage.setItem(
    `shoppingCart_${userToken}`,
    JSON.stringify(existingShoppingCartData)
  );

  console.log('Shopping cart data:', existingShoppingCartData);
};

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

loginLink.addEventListener('click', function (event) {
  event.preventDefault();

  loginDialog.showModal();
});

const loginCloseButton = document.querySelector('.login-close-button');
loginCloseButton.addEventListener('click', function () {
  failText.style.visibility = 'hidden';
  loginDialog.close();
});

registerLink.addEventListener('click', function (event) {
  event.preventDefault();
  registerDialog.showModal();
});

const registerCloseButton = document.querySelector('.register-close-button');
registerCloseButton.addEventListener('click', function (event) {
  event.preventDefault();
  registerDialog.close();
});

const registerForm = document.querySelector('#registration-form');

registerForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const data = {
    name: document.getElementById('register-username').value,
    email: document.getElementById('register-email').value,
    password: document.getElementById('register-pswd').value,
  };

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + '/auth/register', fetchOptions);
  const json = await response.json();

  if (json.error) {
    alert(json.error.message);
  } else {
    alert(json.message);
  }
});

const loginForm = document.querySelector('#login-form');
const failText = document.querySelector('.fail-login-text');

loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  try {
    const data = {
      name: document.getElementById('login-username').value,
      password: document.getElementById('login-pswd').value,
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url + '/auth/login', fetchOptions);
    const json = await response.json();

    console.log(response.status);

    if (response.status === 200) {
      const rememberMe = document.getElementById('remember-me').checked;

      if (rememberMe) {
        console.log('localStorage');
        localStorage.setItem('token', json.token);
      } else {
        console.log('sessionStorage');
        sessionStorage.setItem('token', json.token);
      }

      const token =
        localStorage.getItem('token') || sessionStorage.getItem('token');

      alert('Login successful');
      loginDialog.close();

      updateLinkVisibility();
    } else {
      failText.textContent = json.error.message;
    }
  } catch (error) {
    console.error('Error:', error);
    failText.style.visibility = 'visible';
  }
});

const logout = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  loginLink.style.display = 'block';
  registerLink.style.display = 'block';
  adminLink.style.display = 'none';
  logoutLink.style.display = 'none';
  accountLink.style.display = 'none';
};

logoutLink.addEventListener('click', function (event) {
  event.preventDefault();

  const confirmLogout = confirm('Are you sure you want to logout?');
  if (confirmLogout) {
    logout();
  }
});

window.addEventListener('click', function (event) {
  if (event.target == loginDialog) {
    loginDialog.close();
    failText.style.visibility = 'hidden';
  }

  if (event.target == registerDialog) registerDialog.close();
});

const updateLinkVisibility = () => {
  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  if (token) {
    loginLink.style.display = 'none';
    registerLink.style.display = 'none';
    logoutLink.style.display = 'block';
    accountLink.style.display = 'block';
    checkIfAdmin(token);
  } else {
    loginLink.style.display = 'block';
    registerLink.style.display = 'block';
    logoutLink.style.display = 'none';
    adminLink.style.display = 'none';
    accountLink.style.display = 'none';
  }
};

updateLinkVisibility();

window.onload = async () => {
  await fetchAndAddProducts();
  await displayFoods(products);
};


// Update css
// Update total
// Delete from sessions storage
// Update checkout
