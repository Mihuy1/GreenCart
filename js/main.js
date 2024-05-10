'use strict';

const url = 'https://10.120.32.54/app/api/v1';
const imageUrl = 'https://10.120.32.54/app/uploads/';

const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const logoutLink = document.querySelector('.logout-link');
const adminLink = document.querySelector('.admin-link');
const accountLink = document.querySelector('.account-link');

const closeSidebar = document.querySelector('#close-sidebar');

const mainSection = document.querySelector('.main-section');

const loginDialog = document.querySelector('.login-modal');
const registerDialog = document.querySelector('.registration-modal');

document.getElementById('nav-toggle').addEventListener('click', function () {
  document.querySelector('.sidebar').classList.toggle('active');
  mainSection.classList.toggle('active');
  console.log('clicked');
});

closeSidebar.addEventListener('click', function () {
  document.querySelector('.sidebar').classList.remove('active');
  mainSection.classList.remove('active');
});

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
      const sidebar = document.querySelector('.sidebar');

      evt.preventDefault();

      if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
      }

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
        const sidebar = document.querySelector('.sidebar');

        evt.preventDefault();

        if (sidebar.classList.contains('active')) {
          sidebar.classList.remove('active');
        }

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

      const searchForm = document.querySelector('.search-form');

      const sidebar = document.querySelector('.sidebar');

      searchForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

      searchBar.addEventListener('input', (evt) => {
        evt.preventDefault();
        const searchValue = evt.target.value.toLowerCase();

        const filteredProducts = selectedFoods.filter((product) => {
          return product.name.toLowerCase().includes(searchValue);
        });
        displayFoods(filteredProducts);
      });

      searchBar.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter') {
          evt.preventDefault();

          if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
          }
        }
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

      const token =
        localStorage.getItem('token') || sessionStorage.getItem('token');

      if (token) {
        const shoppingCartData =
          JSON.parse(sessionStorage.getItem(`shoppingCart_${token}`)) || [];
        const existingProductIndex = shoppingCartData.findIndex(
          (item) => item.productId === food.productId
        );

        if (existingProductIndex !== -1) {
          quantityNumber.textContent =
            shoppingCartData[existingProductIndex].quantity;
        }
      }

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

        addProductToCart(food.productId, quantity);
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

    if (json.customer[0].role === 'admin') {
      adminLink.style.display = 'block';
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const addProductToCart = async (productId, quantity) => {
  const userToken =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  if (!userToken) {
    alert('You need to login to buy products');
    return;
  }

  let existingShoppingCartData =
    JSON.parse(sessionStorage.getItem(`shoppingCart_${userToken}`)) || [];

  const existingProductIndex = existingShoppingCartData.findIndex(
    (item) => item.productId === productId
  );
  if (existingProductIndex !== -1) {
    if (existingShoppingCartData[existingProductIndex].quantity <= quantity) {
      existingShoppingCartData[existingProductIndex].quantity += quantity;
    } else if (
      existingShoppingCartData[existingProductIndex].quantity > quantity
    ) {
      existingShoppingCartData[existingProductIndex].quantity = quantity;
    }
  } else {
    existingShoppingCartData.push({productId, quantity});

    updateCart(productId, quantity);
  }

  sessionStorage.setItem(
    `shoppingCart_${userToken}`,
    JSON.stringify(existingShoppingCartData)
  );
};

const updateCart = async (productId, quantity) => {
  const cartContent = document.querySelector('.cart-content');

  const cartBoxDiv = document.createElement('div');
  cartBoxDiv.classList.add('cart-box');

  const imgElement = document.createElement('img'); // Goes inside cart-box
  imgElement.classList.add('cart-img');

  const detailBox = document.createElement('div'); // goes inside cart-box
  detailBox.classList.add('detail-box');

  const productTitle = document.createElement('div'); // Goes inside detail-box
  productTitle.classList.add('cart-product-title');

  const productPrice = document.createElement('div'); // Goes inside detail-box
  productPrice.classList.add('cart-price');

  const quantityElement = document.createElement('input'); // Goes inside detail-box
  quantityElement.classList.add('cart-quantity');
  quantityElement.type = 'number';
  quantityElement.value = quantity;

  const trashIcon = document.createElement('ion-icon'); // Goes inside cart-box
  trashIcon.setAttribute('name', 'trash-outline');
  trashIcon.classList.add('cart-removing');

  const product = await getProductById(productId);

  imgElement.src = imageUrl + product[0].file;
  imgElement.alt = product[0].name;

  productTitle.textContent = product[0].name;
  productPrice.textContent = product[0].price * quantity + ' €';

  let total = 0;

  trashIcon.addEventListener('click', (evt) => {
    evt.preventDefault();

    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');

    const shoppingCartData =
      JSON.parse(sessionStorage.getItem(`shoppingCart_${token}`)) || [];

    const existingProductIndex = shoppingCartData.findIndex(
      (item) => item.productId === productId
    );

    // Update the total price
    total = 0;

    shoppingCartData.splice(existingProductIndex, 1);

    sessionStorage.setItem(
      `shoppingCart_${token}`,
      JSON.stringify(shoppingCartData)
    );

    shoppingCartData.forEach((item) => {
      const productPrice = products.find(
        (product) => product.productId === item.productId
      ).price;

      total += productPrice * item.quantity;

      totalEleemnt.textContent = total + ' €';
    });

    if (shoppingCartData.length === 0) {
      totalEleemnt.textContent = '0 €';
      total = 0;
    }

    cartBoxDiv.remove();
  });

  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  const totalEleemnt = document.querySelector('.total-price');

  const shoppingCartData =
    JSON.parse(sessionStorage.getItem(`shoppingCart_${token}`)) || [];

  shoppingCartData.forEach((item) => {
    const productPrice = products.find(
      (product) => product.productId === item.productId
    ).price;

    total += productPrice * item.quantity;
  });

  totalEleemnt.textContent = total + ' €';

  quantityElement.addEventListener('change', (evt) => {
    evt.preventDefault();

    const shoppingCartData =
      JSON.parse(sessionStorage.getItem(`shoppingCart_${token}`)) || [];

    shoppingCartData.forEach((item) => {
      if (item.productId === productId) {
        item.quantity = parseInt(quantityElement.value);
        total = 0;

        shoppingCartData.forEach((item) => {
          const productPrice = products.find(
            (product) => product.productId === item.productId
          ).price;

          total += productPrice * item.quantity;
        });

        totalEleemnt.textContent = total + ' €';
        productPrice.textContent =
          product[0].price * quantityElement.value + ' €';

        sessionStorage.setItem(
          `shoppingCart_${token}`,
          JSON.stringify(shoppingCartData)
        );
      }
    });
  });

  totalEleemnt.textContent = total.toFixed(2);

  cartBoxDiv.appendChild(imgElement);
  detailBox.appendChild(productTitle);
  detailBox.appendChild(productPrice);
  detailBox.appendChild(quantityElement);

  cartContent.appendChild(cartBoxDiv);

  cartBoxDiv.appendChild(detailBox);
  cartBoxDiv.appendChild(trashIcon);
};

const buyButton = document.querySelector('.btn-buy');

buyButton.addEventListener('click', async (evt) => {
  evt.preventDefault();

  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  if (!token) {
    alert('You need to login to buy products');
    return;
  }

  const shoppingCartData = JSON.parse(
    sessionStorage.getItem(`shoppingCart_${token}`)
  );

  if (shoppingCartData.length === 0) {
    alert('You have no products in your cart');
    return;
  }

  // Move to checkout page
  window.location.href = 'checkout.html';
});

const loginCloseButton = document.querySelector('.login-close-button');
loginCloseButton.addEventListener('click', function () {
  failText.style.visibility = 'hidden';
  loginDialog.close();
});

const registerCloseButton = document.querySelector('.register-close-button');
registerCloseButton.addEventListener('click', function (event) {
  event.preventDefault();
  registerDialog.close();
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

const getProductById = async (productId) => {
  try {
    const response = await fetch(`${url}/products/${productId}`);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error fetching product');
    }
  } catch (error) {
    console.error(error);
  }
};

updateLinkVisibility();

window.onload = async () => {
  await fetchAndAddProducts();
  await displayFoods(products);

  // get shoppingCart_ token from sessionStorage and if it exists, display the products in the cart
  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  if (token) {
    const shoppingCartData =
      JSON.parse(sessionStorage.getItem(`shoppingCart_${token}`)) || [];

    shoppingCartData.forEach(async (item) => {
      const product = await getProductById(item.productId);
      updateCart(product[0].productId, item.quantity);
    });
  }
};
