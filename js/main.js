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
  {name: 'Jauheliha', description: 'Ground beef', price: 5.99, picture: "https://public.keskofiles.com/f/k-ruoka/product/6410405250902"},
  {name: 'Kana', description: 'Chicken', price: 7.99, picture: "https://cdn.s-cloud.fi/v1/w750_h750_q75/assets/dam-id/7jRAppMLqr9AlD9vED9nWO.jpg"},
  {name: 'Kala', description: 'fish', price: 15.30, picture: "https://public.keskofiles.com/f/k-ruoka/product/6410405170453" },
  {name: 'Pepperoni', description: 'Pepperoni', price: 9.99, picture:"https://www.spicestore.hk/3318-large_default/beef-pepperoni-500g.jpg"},
  {name: 'Naudanliha', description: 'Beef', price: 10.99, picture:"https://cdn.s-cloud.fi/v1/w640_h640_q75/assets/dam-id/D5vRpa-94Sa8hD8FKsjpA3.jpg"},
];
const frozenFoods = [
  {name: 'Herne pakaste', description: 'Frozen peas', price: 1.99, picture: "https://s3.eu-central-1.amazonaws.com/prod.apetit.fi/product-images/Herne.jpeg"},
  {name: 'Maissi pakaste', description: 'Frozen corn', price: 2.99, picture: "https://s3.eu-central-1.amazonaws.com/prod.apetit.fi/product-images/Apetit_VK_pussikuvat-maissia.jpg"},
];
const hotDrinks = [
  {name: 'Kahvi', description: 'Coffee', price: 2.99, picture:"https://www.halpahalli.fi/media/catalog/product/cache/8e6fb67570b3a23a22b01cd56fafeeef/4/8/484bed0b_b_252Fb_252Fc_252Fa_252Fbbcad00543724fa7bb30132f886bf737juhla_mokka_pannu_500g_1.jpg"},
  {name: 'Tee', description: 'Tea', price: 1.99, picture:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdHW2IX_8iB3FF0C5esLhOPBPjpP_92Z39SuuFRPhbSA&s"},
  {name: 'Kaakao', description: 'Hot chocolate', price: 3.99, picture:"https://foodin.fi/wp-content/uploads/2019/10/Flow_kaakao.png"},
];
const fruits = [
  {name: 'Omena', description: 'Apple', price: 0.99, picture:"https://verkkokauppa-demo.koivuniemi.com/fi-b2c/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/5/9/59967553_m.jpg"},
  {name: 'Appelsiini', description: 'Orange', price: 1.99, picture:"https://cdn.s-cloud.fi/v1/w750_h750_q75/assets/dam-id/FX5koolEqsC9hi6oo4QnLx.jpg"},
  {name: 'Banaani', description: 'Banana', price: 2.99, picture:"https://public.keskofiles.com/f/k-ruoka/product/2000503600002"},
  {name: 'Mango', description: 'Mango', price: 3.99, picture:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ifYw4QI4mC_5KJkjGAXxBnH62UQywqGilmV6O54iwQ&s"},
];
const vegetables = [
  {name: 'Porkkana', description: 'Carrot', price: 0.99, picture:"https://verkkokauppa-demo.koivuniemi.com/fi-b2c/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/5/3/53095132_m.jpg"},
  {name: 'Paprika', description: 'Bell pepper', price: 1.99, picture:"https://www.plantagen.fi/dw/image/v2/BCMR_PRD/on/demandware.static/-/Sites-inriver-catalog/default/dwcf5fd6e1/images/large/all_nature_capsicum_pepper_robertina_10cm_540927.jpg?sh=618&sfrm=jpeg"},
  {name: 'Kurkku', description: 'Cucumber', price: 2.99, picture:"https://www.lepola.fi/application/files/1114/8707/9566/avomaankurkku.jpg"},
  {name: 'Salaatti', description: 'Lettuce', price: 3.99, picture:"https://cdn.s-cloud.fi/v1/w750_h750_q75/assets/dam-id/BoBmTl2L4148MJwx2yb8JU.jpg"},
];
const cheeses = [
  {name: 'Mozzarella', description: 'Mozzarella cheese', price: 4.99, picture:"https://www.galbani.co.uk/wp-content/uploads/2021/05/Galbani-Mozza-125g-NSR.jpg"},
  {name: 'Cheddar', description: 'Cheddar cheese', price: 5.99, picture:"https://cdn.s-cloud.fi/v1/w750_h750_q75/assets/dam-id/5s9bwZ3K4D_8h0WTksWe5K.jpg"},
  {name: 'Feta', description: 'Feta cheese', price: 6.99, picture:"https://presidentcheese.com/wp-content/uploads/2016/05/President-Feta-Slab-125lb-Twin-Pack-72DPI-copy-scaled-1200x1200-cropped.jpg"},
  {name: 'Vuohenjuusto', description: 'Goat cheese', price: 7.99, picture:"https://public.keskofiles.com/f/k-ruoka/product/6410405115232?w=700&h=390&fit=max&auto=format&fm=jpg&cs=srgb"},
];
const dairyProducts = [
  {name: 'Maito', description: 'Milk', price: 1.99, picture:"https://cdn.valio.fi/mediafiles/4ab7d7d7-6812-42b6-86d1-38cdf23b8252/800x800-product/800x800/valio-kevytmaito-5-dl.png"},
  {name: 'Kerma', description: 'Cream', price: 2.99, picture:"https://www.juustoportti.fi/wp-content/uploads/2023/12/juustoportti-vispikerma-5-dl-laktoositon-uht.png"},
  {name: 'Jogurtti', description: 'Yogurt', price: 3.99, picture:"https://evermade-benecol-multisite-website.s3.eu-north-1.amazonaws.com/wp-content/uploads/2020/08/25123711/Benecol_FI_greek_style_maustamaton_800x800-768x768.png"},
  {name: 'Piimä', description: 'Buttermilk', price: 4.99, picture:"https://ams3.digitaloceanspaces.com/avmedia/e/20/e204939a-efd0-4e15-9221-6b47d72d78d3.webp"},
];
const sweetProducts = [
  {name: 'Fazer suklaa', description: 'Chocolate', price: 2.99, picture:'https://fi.fazer.com/cdn/shop/files/Raspberry-case_640x640.png?v=1704973682'},
  {name: 'Fazer Remix Mini Sour karkkipussi', description: 'candy', price: '1,65', picture: "https://res.cloudinary.com/karkkainen/image/upload/b_rgb:FFFFFF,c_pad,dpr_2.0,f_auto,h_600,q_auto,w_600/c_pad,h_600,w_600/v1/tuotekuvat/6416453049390?pgw=1"},
  {name: 'Fazer Remix Mini Choco karkkipussi 100g', description: 'candy', price: '2.15', picture: "https://fi.fazer.com/cdn/shop/files/Remix-mini-choco_1200x.png?v=1698235087"},
  {name: 'Fazer Marianne karkkipussi 220g', description: 'veganinen', price: '4.09', picture: " https://public.keskofiles.com/f/k-ruoka/product/6410803642019"},
  {name: 'Fazer Geisha Hasselpähkinänougat suklaalevy 121g', description: 'suklaa', price: '3.20', picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMTzNOMOqxGDoLNiaHG2hbfuo1DLyFOT3YQDgew5qRpA&s"},
];

const saltyProducts =[
  {name: 'Lays Salted sipsit 175g', description:'Lays', price: 3.00,picture:" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvSyeu8LJSln_w0EqCaAPodDMJvT3VideUWf_Yhl4nSQ&s"},
  {name: 'Pringles Cheese-Onion 185g', description: 'sipsit', price: '3.69', picture: "https://public.keskofiles.com/f/k-ruoka/product/0NNH0/5053990167494?w=700&h=390&fit=max&auto=format&fm=jpg&cs=srgb"},
  {name: 'Paahdetut ja suolatut pistaasipähkinät 325g', description: 'Pähkinät', price: '10.59', picture: "https://www.earthcontrol.fi/globalassets/connect-media/image/84/16432_xl-ec-quatro-pistacio-325g.png?preset=product-large&{lazy}&bgcolor=white"},
  {name: 'Taffel Sips suolattu sipsi 145g', description: 'sipsit', price: '2.09', picture: "https://www.taffel.fi/wp-content/uploads/sites/73/2023/06/emmi_475008003.png"},
  {name: 'Estrella suolattu Micropopcorn 3kpl', description: 'Popcornit', price: '2.45', picture: ""},

];

const foods = [
  meats,
  frozenFoods,
  hotDrinks,
  fruits,
  vegetables,
  cheeses,
  dairyProducts,
  sweetProducts,
  saltyProducts
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
      case 'sweetProducts':
        selectedFoods = sweetProducts;
        break;
      case 'saltyProducts':
        selectedFoods = saltyProducts;
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
      image.src = food.picture;
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
        modalImage.src = food.picture;
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
    image.src = food.picture;
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
