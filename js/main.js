'use strict';

const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

const loginDialog = document.querySelector('.login-modal');
const registerDialog = document.querySelector('.registration-modal');

loginLink.addEventListener('click', function (event) {
  event.preventDefault();

  loginDialog.showModal();
});

const loginCloseButton = document.querySelector('.login-close-button');
loginCloseButton.addEventListener('click', function () {
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

window.addEventListener('click', function (event) {
  if (event.target == loginDialog) loginDialog.close();

  if (event.target == registerDialog) registerDialog.close();
});

const meats = [
  {name: 'Jauheliha', description: 'Ground beef', price: 5.99},
  {name: 'Kana', description: 'Chicken', price: 7.99},
  {name: 'Kinkku', description: 'Ham', price: 8.99},
  {name: 'Pepperoni', description: 'Pepperoni', price: 9.99},
  {name: 'Naudanliha', description: 'Beef', price: 10.99},
];
const frozenFoods = [
  {name: 'Herne pakaste', description: 'Frozen peas', price: 1.99},
  {name: 'Maissi pakaste', description: 'Frozen corn', price: 2.99},
];
const hotDrinks = [
  {name: 'Kahvi', description: 'Coffee', price: 2.99},
  {name: 'Tee', description: 'Tea', price: 1.99},
  {name: 'Kaakao', description: 'Hot chocolate', price: 3.99},
];
const fruits = [
  {name: 'Omena', description: 'Apple', price: 0.99},
  {name: 'Appelsiini', description: 'Orange', price: 1.99},
  {name: 'Banaani', description: 'Banana', price: 2.99},
  {name: 'Mango', description: 'Mango', price: 3.99},
];
const vegetables = [
  {name: 'Porkkana', description: 'Carrot', price: 0.99},
  {name: 'Paprika', description: 'Bell pepper', price: 1.99},
  {name: 'Kurkku', description: 'Cucumber', price: 2.99},
  {name: 'Salaatti', description: 'Lettuce', price: 3.99},
];
const cheeses = [
  {name: 'Mozzarella', description: 'Mozzarella cheese', price: 4.99},
  {name: 'Cheddar', description: 'Cheddar cheese', price: 5.99},
  {name: 'Feta', description: 'Feta cheese', price: 6.99},
  {name: 'Vuohenjuusto', description: 'Goat cheese', price: 7.99},
];
const dairyProducts = [
  {name: 'Maito', description: 'Milk', price: 1.99},
  {name: 'Kerma', description: 'Cream', price: 2.99},
  {name: 'Jogurtti', description: 'Yogurt', price: 3.99},
  {name: 'Piimä', description: 'Buttermilk', price: 4.99},
];

const foods = [
  meats,
  frozenFoods,
  hotDrinks,
  fruits,
  vegetables,
  cheeses,
  dairyProducts,
];

let selectedFoods = foods.flat();

const buttons = document.querySelectorAll('.button-option');

const foodsDiv = document.querySelector('.foods');

buttons[0].classList.add('selected');

buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    buttons.forEach(function (button) {
      button.classList.remove('selected');
    });
    button.classList.add('selected');

    foodsDiv.innerHTML = '';

    const foodType = this.getAttribute('data-food');

    selectedFoods;
    switch (foodType) {
      case 'meats':
        selectedFoods = meats;
        break;
      case 'frozenFoods':
        selectedFoods = frozenFoods;
        break;
      case 'hotDrinks':
        selectedFoods = hotDrinks;
        break;
      case 'fruits':
        selectedFoods = fruits;
        break;
      case 'vegetables':
        selectedFoods = vegetables;
        break;
      case 'cheeses':
        selectedFoods = cheeses;
        break;
      case 'dairyProducts':
        selectedFoods = dairyProducts;
        break;
      case 'all':
        selectedFoods = foods.flat();
        break;
      default:
        selectedFoods = [];
        break;
    }

    const foodInfo = document.querySelector('.food-info');

    selectedFoods.forEach(function (food) {
      const article = document.createElement('article');
      const image = document.createElement('img');
      const title = document.createElement('h3');
      const description = document.createElement('p');
      const price = document.createElement('p');

      title.textContent = food.name;
      image.src = 'https://placehold.co/400x400';
      price.textContent = food.price + ' €';
      description.textContent = food.description;

      price.style.fontWeight = 'bold';

      article.appendChild(image);
      article.appendChild(title);
      article.appendChild(price);
      article.appendChild(description);

      foodsDiv.appendChild(article);

      article.addEventListener('click', function () {
        foodInfo.innerHTML = '';

        const addToCartButton = document.createElement('button');

        addToCartButton.textContent = 'Add to cart';

        const modalImage = document.createElement('img');
        const modalTitle = document.createElement('h2');
        const modalDescription = document.createElement('p');
        const modalPrice = document.createElement('p');

        modalTitle.textContent = food.name;
        modalImage.src = 'https://placehold.co/400x400';
        modalPrice.textContent = food.price + ' €';
        modalDescription.textContent = food.description;

        modalPrice.style.fontWeight = 'bold';

        addToCartButton.classList.add('buy-button');

        foodInfo.appendChild(modalImage);
        foodInfo.appendChild(modalTitle);
        foodInfo.appendChild(modalDescription);
        foodInfo.appendChild(modalPrice);
        foodInfo.appendChild(addToCartButton);

        foodInfo.showModal();

        window.addEventListener('click', function (event) {
          if (event.target == foodInfo) {
            foodInfo.close();
          }
        });
      });
    });
  });
});

function displayFoods(selectedFoods) {
  foodsDiv.innerHTML = '';

  selectedFoods.forEach(function (food) {
    const article = document.createElement('article');
    const image = document.createElement('img');
    const title = document.createElement('h3');
    const description = document.createElement('p');
    const price = document.createElement('p');

    title.textContent = food.name;
    image.src = 'https://placehold.co/400x400';
    price.textContent = food.price + ' €';
    description.textContent = food.description;
    price.style.fontWeight = 'bold';

    article.appendChild(image);
    article.appendChild(title);
    article.appendChild(price);
    article.appendChild(description);

    foodsDiv.appendChild(article);
  });
}

displayFoods(foods.flat());

function filterFoods(foods, filter) {
  return foods.filter(
    (food) =>
      food.name.toLowerCase().includes(filter.toLowerCase()) ||
      food.description.toLowerCase().includes(filter.toLowerCase())
  );
}

const searchBar = document.querySelector('.search-input');

searchBar.addEventListener('input', function () {
  const filter = this.value;
  const filteredFoods = filterFoods(selectedFoods.flat(), filter);
  displayFoods(filteredFoods);
});
