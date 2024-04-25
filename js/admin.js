const url = 'http://localhost:3000/api/v1'; // change url when uploading to server
const imageUrl = 'http://localhost:3000/uploads/'; // change url when uploading to server

const newProductCloseButton = document.querySelector('.new-product-close');

newProductCloseButton.addEventListener('click', function () {
  const dialog = document.querySelector('.add-product-dialog');
  dialog.close();
});

const meats = [
  {
    name: 'Jauheliha',
    description: 'Ground beef',
    price: 5.99,
    picture: 'https://public.keskofiles.com/f/k-ruoka/product/6410405250902',
  },
  {
    name: 'Kana',
    description: 'Chicken',
    price: 7.99,
    picture:
      'https://cdn.s-cloud.fi/v1/w750_h750_q75/assets/dam-id/7jRAppMLqr9AlD9vED9nWO.jpg',
  },
  {
    name: 'Kala',
    description: 'fish',
    price: 15.3,
    picture: 'https://public.keskofiles.com/f/k-ruoka/product/6410405170453',
  },
  {
    name: 'Pepperoni',
    description: 'Pepperoni',
    price: 9.99,
    picture:
      'https://www.spicestore.hk/3318-large_default/beef-pepperoni-500g.jpg',
  },
  {
    name: 'Naudanliha',
    description: 'Beef',
    price: 10.99,
    picture:
      'https://cdn.s-cloud.fi/v1/w640_h640_q75/assets/dam-id/D5vRpa-94Sa8hD8FKsjpA3.jpg',
  },
];
const frozenFoods = [
  {
    name: 'Herne pakaste',
    description: 'Frozen peas',
    price: 1.99,
    picture:
      'https://s3.eu-central-1.amazonaws.com/prod.apetit.fi/product-images/Herne.jpeg',
  },
  {
    name: 'Maissi pakaste',
    description: 'Frozen corn',
    price: 2.99,
    picture:
      'https://s3.eu-central-1.amazonaws.com/prod.apetit.fi/product-images/Apetit_VK_pussikuvat-maissia.jpg',
  },
];
const hotDrinks = [
  {
    name: 'Kahvi',
    description: 'Coffee',
    price: 2.99,
    picture:
      'https://www.halpahalli.fi/media/catalog/product/cache/8e6fb67570b3a23a22b01cd56fafeeef/4/8/484bed0b_b_252Fb_252Fc_252Fa_252Fbbcad00543724fa7bb30132f886bf737juhla_mokka_pannu_500g_1.jpg',
  },
  {
    name: 'Tee',
    description: 'Tea',
    price: 1.99,
    picture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdHW2IX_8iB3FF0C5esLhOPBPjpP_92Z39SuuFRPhbSA&s',
  },
  {
    name: 'Kaakao',
    description: 'Hot chocolate',
    price: 3.99,
    picture: 'https://foodin.fi/wp-content/uploads/2019/10/Flow_kaakao.png',
  },
];
const fruits = [
  {
    name: 'Omena',
    description: 'Apple',
    price: 0.99,
    picture:
      'https://verkkokauppa-demo.koivuniemi.com/fi-b2c/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/5/9/59967553_m.jpg',
  },
  {
    name: 'Appelsiini',
    description: 'Orange',
    price: 1.99,
    picture:
      'https://cdn.s-cloud.fi/v1/w750_h750_q75/assets/dam-id/FX5koolEqsC9hi6oo4QnLx.jpg',
  },
  {
    name: 'Banaani',
    description: 'Banana',
    price: 2.99,
    picture: 'https://public.keskofiles.com/f/k-ruoka/product/2000503600002',
  },
  {
    name: 'Mango',
    description: 'Mango',
    price: 3.99,
    picture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ifYw4QI4mC_5KJkjGAXxBnH62UQywqGilmV6O54iwQ&s',
  },
];
const vegetables = [
  {
    name: 'Porkkana',
    description: 'Carrot',
    price: 0.99,
    picture:
      'https://verkkokauppa-demo.koivuniemi.com/fi-b2c/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/5/3/53095132_m.jpg',
  },
  {
    name: 'Paprika',
    description: 'Bell pepper',
    price: 1.99,
    picture:
      'https://www.plantagen.fi/dw/image/v2/BCMR_PRD/on/demandware.static/-/Sites-inriver-catalog/default/dwcf5fd6e1/images/large/all_nature_capsicum_pepper_robertina_10cm_540927.jpg?sh=618&sfrm=jpeg',
  },
  {
    name: 'Kurkku',
    description: 'Cucumber',
    price: 2.99,
    picture:
      'https://www.lepola.fi/application/files/1114/8707/9566/avomaankurkku.jpg',
  },
  {
    name: 'Salaatti',
    description: 'Lettuce',
    price: 3.99,
    picture:
      'https://cdn.s-cloud.fi/v1/w750_h750_q75/assets/dam-id/BoBmTl2L4148MJwx2yb8JU.jpg',
  },
];
const cheeses = [
  {
    name: 'Mozzarella',
    description: 'Mozzarella cheese',
    price: 4.99,
    picture:
      'https://www.galbani.co.uk/wp-content/uploads/2021/05/Galbani-Mozza-125g-NSR.jpg',
  },
  {
    name: 'Cheddar',
    description: 'Cheddar cheese',
    price: 5.99,
    picture:
      'https://cdn.s-cloud.fi/v1/w750_h750_q75/assets/dam-id/5s9bwZ3K4D_8h0WTksWe5K.jpg',
  },
  {
    name: 'Feta',
    description: 'Feta cheese',
    price: 6.99,
    picture:
      'https://presidentcheese.com/wp-content/uploads/2016/05/President-Feta-Slab-125lb-Twin-Pack-72DPI-copy-scaled-1200x1200-cropped.jpg',
  },
  {
    name: 'Vuohenjuusto',
    description: 'Goat cheese',
    price: 7.99,
    picture:
      'https://public.keskofiles.com/f/k-ruoka/product/6410405115232?w=700&h=390&fit=max&auto=format&fm=jpg&cs=srgb',
  },
];
const dairyProducts = [
  {
    name: 'Maito',
    description: 'Milk',
    price: 1.99,
    picture:
      'https://cdn.valio.fi/mediafiles/4ab7d7d7-6812-42b6-86d1-38cdf23b8252/800x800-product/800x800/valio-kevytmaito-5-dl.png',
  },
  {
    name: 'Kerma',
    description: 'Cream',
    price: 2.99,
    picture:
      'https://www.juustoportti.fi/wp-content/uploads/2023/12/juustoportti-vispikerma-5-dl-laktoositon-uht.png',
  },
  {
    name: 'Jogurtti',
    description: 'Yogurt',
    price: 3.99,
    picture:
      'https://evermade-benecol-multisite-website.s3.eu-north-1.amazonaws.com/wp-content/uploads/2020/08/25123711/Benecol_FI_greek_style_maustamaton_800x800-768x768.png',
  },
  {
    name: 'Piimä',
    description: 'Buttermilk',
    price: 4.99,
    picture:
      'https://ams3.digitaloceanspaces.com/avmedia/e/20/e204939a-efd0-4e15-9221-6b47d72d78d3.webp',
  },
];
const sweetProducts = [
  {
    name: 'Fazer suklaa',
    description: 'Chocolate',
    price: 2.99,
    picture:
      'https://fi.fazer.com/cdn/shop/files/Raspberry-case_640x640.png?v=1704973682',
  },
  {
    name: 'Fazer Remix Mini Sour karkkipussi',
    description: 'candy',
    price: '1,65',
    picture:
      'https://res.cloudinary.com/karkkainen/image/upload/b_rgb:FFFFFF,c_pad,dpr_2.0,f_auto,h_600,q_auto,w_600/c_pad,h_600,w_600/v1/tuotekuvat/6416453049390?pgw=1',
  },
  {
    name: 'Fazer Remix Mini Choco karkkipussi 100g',
    description: 'candy',
    price: '2.15',
    picture:
      'https://fi.fazer.com/cdn/shop/files/Remix-mini-choco_1200x.png?v=1698235087',
  },
  {
    name: 'Fazer Marianne karkkipussi 220g',
    description: 'veganinen',
    price: '4.09',
    picture: ' https://public.keskofiles.com/f/k-ruoka/product/6410803642019',
  },
  {
    name: 'Fazer Geisha Hasselpähkinänougat suklaalevy 121g',
    description: 'suklaa',
    price: '3.20',
    picture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMTzNOMOqxGDoLNiaHG2hbfuo1DLyFOT3YQDgew5qRpA&s',
  },
];

const saltyProducts = [
  {
    name: 'Lays Salted sipsit 175g',
    description: 'Lays',
    price: 3.0,
    picture:
      ' https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvSyeu8LJSln_w0EqCaAPodDMJvT3VideUWf_Yhl4nSQ&s',
  },
  {
    name: 'Pringles Cheese-Onion 185g',
    description: 'sipsit',
    price: '3.69',
    picture:
      'https://public.keskofiles.com/f/k-ruoka/product/0NNH0/5053990167494?w=700&h=390&fit=max&auto=format&fm=jpg&cs=srgb',
  },
  {
    name: 'Paahdetut ja suolatut pistaasipähkinät 325g',
    description: 'Pähkinät',
    price: '10.59',
    picture:
      'https://www.earthcontrol.fi/globalassets/connect-media/image/84/16432_xl-ec-quatro-pistacio-325g.png?preset=product-large&{lazy}&bgcolor=white',
  },
  {
    name: 'Taffel Sips suolattu sipsi 145g',
    description: 'sipsit',
    price: '2.09',
    picture:
      'https://www.taffel.fi/wp-content/uploads/sites/73/2023/06/emmi_475008003.png',
  },
  {
    name: 'Estrella suolattu Micropopcorn 3kpl',
    description: 'Popcornit',
    price: '2.45',
    picture: '',
  },
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
  saltyProducts,
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

    const foodEdit = document.querySelector('.food-info');

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
        foodEdit.innerHTML = '';
        foodEditContent.innerHTML = '';

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

        addToCartButton.classList.add('modal-button');

        foodEditContent.appendChild(modalImage);
        foodEditContent.appendChild(modalTitle);
        foodEditContent.appendChild(modalDescription);
        foodEditContent.appendChild(modalPrice);
        foodEditContent.appendChild(addToCartButton);

        foodEdit.showModal();

        window.addEventListener('click', function (event) {
          if (event.target == foodEdit) {
            foodEdit.close();
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

//displayFoods(foods.flat());

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

const products = [];

const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${url}/products`);
    const data = await response.json();

    if (response.status === 200) {
      products.push(...data); // Use spread operator to push individual items into the products array
    } else {
      console.error('Error');
    }
  } catch (error) {
    console.error(error);
  }
};

const foodEdit = document.querySelector('.food-edit');
const foodEditContent = document.querySelector('.food-edit-content');

const listAllProducts = async () => {
  const productsDiv = document.querySelector('.foods');

  for (let i = 0; i < products.length; i++) {
    const articleElement = document.createElement('article');
    const titleElement = document.createElement('h3');
    const descriptionElement = document.createElement('p');
    const priceElement = document.createElement('p');
    const imageElement = document.createElement('img');

    imageElement.src = imageUrl + products[i].file;

    titleElement.textContent = products[i].name;
    descriptionElement.textContent = products[i].description;
    priceElement.textContent = products[i].price + ' €';

    priceElement.style.fontWeight = 'bold';

    imageElement.style.maxWidth = '250px';
    imageElement.style.maxHeight = '250px';

    articleElement.appendChild(imageElement);
    articleElement.appendChild(titleElement);
    articleElement.appendChild(descriptionElement);
    articleElement.appendChild(priceElement);

    productsDiv.appendChild(articleElement);

    articleElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      foodEdit.innerHTML = '';
      foodEditContent.innerHTML = '';

      const closeButton = document.createElement('button');
      closeButton.textContent = 'X';
      closeButton.classList.add('close-button');

      closeButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        foodEdit.close();
      });

      const editForm = document.createElement('form');
      const editTitle = document.createElement('input');
      const editDescription = document.createElement('input');
      const editPrice = document.createElement('input');
      const editImage = document.createElement('input');

      const editTitleLabel = document.createElement('label');
      const editDescriptionLabel = document.createElement('label');
      const editPriceLabel = document.createElement('label');
      const editImageLabel = document.createElement('label');

      editTitleLabel.textContent = 'Title';
      editDescriptionLabel.textContent = 'Description';
      editPriceLabel.textContent = 'Price';
      editImageLabel.textContent = 'Image';

      editTitle.value = products[i].name;
      editDescription.value = products[i].description;
      editPrice.value = products[i].price;
      editImage.value = products[i].file;

      editImage.type = 'file';
      editImage.accept = 'image/*';

      editTitle.classList.add('modal-input');
      editDescription.classList.add('modal-input');
      editPrice.classList.add('modal-input');
      editImage.classList.add('modal-input');

      editForm.appendChild(editTitleLabel);
      editForm.appendChild(editTitle);

      editForm.appendChild(editDescriptionLabel);
      editForm.appendChild(editDescription);

      editForm.appendChild(editPriceLabel);
      editForm.appendChild(editPrice);

      editForm.appendChild(editImageLabel);
      editForm.appendChild(editImage);

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('modal-button');

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('modal-button');

      editButton.addEventListener('click', async (evt) => {
        evt.preventDefault();

        const updatedProduct = {
          name: editTitle.value,
          description: editDescription.value,
          price: editPrice.value,
        };

        try {
          const response = await fetch(
            `${url}/products/${products[i].productId}`,
            {
              method: 'PUT',
              headers: {
                Authorization:
                  'Bearer ' +
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxMCwibmFtZSI6IlBhdHJpa0giLCJhZGRyZXNzIjoibm9uZSIsImVtYWlsIjoicGF0cmlrLmh5eXRpYWluZW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE0MDI4ODcyfQ.tJiiYOYgRUO8YGJ4I6bwcG8XghOdxiUCF3p9iIhoRmM',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedProduct),
            }
          );

          if (response.ok) {
            alert('Product updated successfully');
            window.location.reload();
          } else {
            alert('Error updating product');
            console.error('Error updating product');
          }
        } catch (error) {
          console.error(error);
        }
      });

      deleteButton.addEventListener('click', async (evt) => {
        evt.preventDefault();

        deleteProduct(products[i].productId);
      });

      foodEditContent.appendChild(editForm);
      foodEditContent.appendChild(editButton);
      foodEditContent.appendChild(closeButton);
      foodEditContent.appendChild(deleteButton);

      foodEdit.appendChild(foodEditContent);
      foodEdit.showModal();
    });
  }
};

const addProduct = async (name, description, price, file, categoryId) => {
  let formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('file', file);
  formData.append('categoryId', categoryId);

  try {
    const options = {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxMCwibmFtZSI6IlBhdHJpa0giLCJhZGRyZXNzIjoibm9uZSIsImVtYWlsIjoicGF0cmlrLmh5eXRpYWluZW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE0MDI4ODcyfQ.tJiiYOYgRUO8YGJ4I6bwcG8XghOdxiUCF3p9iIhoRmM',
      },
      body: formData,
    };

    const response = await fetch(`${url}/products`, options);

    if (response.ok) {
      alert('Product added successfully');
      window.location.reload();
    } else {
      console.error('Error adding product');
    }
  } catch (error) {
    console.error(error);
  }
};

const getAllCategories = async () => {
  try {
    const response = await fetch(`${url}/categories`);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.error('Error fetching categories');
    }
  } catch (error) {
    console.error(error);
  }
};

const addProductButton = document.querySelector('.add-dialog-button');

addProductButton.addEventListener('click', async (evt) => {
  evt.preventDefault();

  const categories = await getAllCategories();

  let select = document.querySelector('#new-product-category');
  select.innerHTML = '';

  console.log('categories', categories[0].name);

  for (let i = 0; i < categories.length; i++) {
    const option = document.createElement('option');
    option.value = categories[i].categoryId;
    option.textContent = categories[i].name;

    select.add(option);
  }

  const dialog = document.querySelector('.add-product-dialog');

  const filePreview = document.querySelector('.file-preview');

  const name = document.querySelector('#product-name');
  const description = document.querySelector('#product-description');
  const price = document.querySelector('#product-price');
  const file = document.querySelector('#product-file');

  file.addEventListener('change', (evt) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = document.createElement('img');
      image.src = reader.result;
      filePreview.innerHTML = '';
      filePreview.appendChild(image);
    };

    reader.readAsDataURL(file.files[0]);
  });

  const form = document.querySelector('.add-product-form');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    console.log('name', file.files[0].name);
    addProduct(
      name.value,
      description.value,
      price.value,
      file.files[0],
      select.value
    );
  });

  dialog.showModal();
});

const deleteProduct = async (productId) => {
  try {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxMCwibmFtZSI6IlBhdHJpa0giLCJhZGRyZXNzIjoibm9uZSIsImVtYWlsIjoicGF0cmlrLmh5eXRpYWluZW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE0MDI4ODcyfQ.tJiiYOYgRUO8YGJ4I6bwcG8XghOdxiUCF3p9iIhoRmM',
      },
    };

    const response = await fetch(`${url}/products/${productId}`, options);

    if (response.ok) {
      alert('Product deleted successfully');
      window.location.reload();
    } else {
      alert('Error deleting product');
      console.error('Error deleting product');
    }
  } catch (error) {
    console.error(error);
  }
};

window.onload = async () => {
  await fetchAllProducts();
  await listAllProducts();
};
