const url = 'http://localhost:3000/api/v1'; // change url when uploading to server
const imageUrl = 'http://localhost:3000/uploads/'; // change url when uploading to server

const newProductCloseButton = document.querySelector('.new-product-close');

newProductCloseButton.addEventListener('click', function () {
  const dialog = document.querySelector('.add-product-dialog');
  dialog.close();
});

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

const deleteProduct = async (productId) => {
  try {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
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

(async function fetchAllData() {
  try {
    allCategories = await getAllCategories();
    allProducts = await getAllProducts();

    meats = allProducts.filter((product) => product.categoryId === 1);
    const frozenFoods = allProducts.filter(
      (product) => product.categoryId === 2
    );
    hotDrinks = allProducts.filter((product) => product.categoryId === 3);
    fruits = allProducts.filter((product) => product.categoryId === 4);
    vegetables = allProducts.filter((product) => product.categoryId === 5);
    cheeses = allProducts.filter((product) => product.categoryId === 6);
    dairyProducts = allProducts.filter((product) => product.categoryId === 7);
    sweetProducts = allProducts.filter((product) => product.categoryId === 8);
    saltyProducts = allProducts.filter((product) => product.categoryId === 9);

    console.log('meats', meats[0].name);

    // Use the filtered products here...
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

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

const fetchAndAddProducts = async () => {
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
        Authorization: 'Bearer ' + localStorage.getItem('token'),
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

window.onload = async () => {
  await fetchAndAddProducts();
  await listAllProducts();
};
