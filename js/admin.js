const url = 'https://10.120.32.54/app/api/v1'; // change url when uploading to server
const imageUrl = 'https://10.120.32.54/app/uploads/'; // change url when uploading to server

const newProductCloseButton = document.querySelector('.new-product-close');

const logoutLink = document.querySelector('.logout-link');

logoutLink.addEventListener('click', (evt) => {
  evt.preventDefault();

  localStorage.removeItem('token');
  sessionStorage.removeItem('token');

  window.location.href = 'main.html';

  alert('Logged out successfully');
});

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
    const token =
      localStorage.getItem('token') ?? sessionStorage.getItem('token');
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
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

      const imageElement = document.createElement('img');
      imageElement.src = imageUrl + category.file;
      imageElement.alt = category.name;
      imageElement.classList.add('category-image');

      imageElement.onerror = () => {
        imageElement.src = 'https://via.placeholder.com/150';
      };

      buttonElement.prepend(imageElement);

      const editButton = document.createElement('span');
      editButton.classList.add('material-symbols-outlined');
      editButton.innerHTML = 'edit';
      editButton.classList.add('edit-button');

      const deleteButton = document.createElement('span');
      deleteButton.classList.add('material-symbols-outlined');
      deleteButton.innerHTML = 'delete';
      deleteButton.classList.add('delete-button');

      deleteButton.addEventListener('click', (evt) => {
        evt.stopPropagation();
        evt.preventDefault();

        deleteCategory(category.categoryId);
      });

      editButton.addEventListener('click', (evt) => {
        evt.stopPropagation();
        evt.preventDefault();

        const dialogElement = document.createElement('dialog');
        dialogElement.classList.add('add-dialog');

        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.classList.add('close-button');

        closeButton.addEventListener('click', (evt) => {
          evt.preventDefault();
          dialogElement.close();
          dialogElement.remove();
        });

        const headerElement = document.createElement('h2');
        headerElement.textContent = 'Edit category';

        const imagePreview = document.createElement('div');
        imagePreview.classList.add('file-preview');

        const image = document.createElement('img');

        // Ensure image is loaded before appending it
        image.onload = () => {
          console.log('Image loaded');
          imagePreview.appendChild(image);
        };

        const formElement = document.createElement('form');
        formElement.classList.add('add-category-form');

        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.required = true;
        inputElement.classList.add('modal-input');
        inputElement.classList.add('category-input');

        const submitElement = document.createElement('button');
        submitElement.textContent = 'Edit';
        submitElement.classList.add('modal-button');
        submitElement.classList.add('category-submit');

        const imageElement = document.createElement('input');
        imageElement.type = 'file';
        imageElement.accept = 'image/*';

        imageElement.addEventListener('change', (evt) => {
          const reader = new FileReader();
          reader.onload = () => {
            image.src = reader.result;
            imagePreview.innerHTML = '';
            imagePreview.appendChild(image);
          };

          reader.readAsDataURL(imageElement.files[0]);
        });

        submitElement.addEventListener('click', (evt) => {
          evt.preventDefault();

          if (!inputElement.value) {
            alert('Please enter a category name');
            return;
          } else if (!imageElement.files[0]) {
            alert('Please select an image');
            return;
          }

          modifyCategory(
            inputElement.value,
            imageElement.files[0],
            category.categoryId
          );
        });

        formElement.appendChild(headerElement);
        formElement.appendChild(imagePreview);
        formElement.appendChild(inputElement);
        formElement.appendChild(imageElement);
        formElement.appendChild(submitElement);

        dialogElement.appendChild(closeButton);
        dialogElement.appendChild(formElement);

        document.body.appendChild(dialogElement);

        inputElement.value = category.name;
        imagePreview.innerHTML = '';

        dialogElement.showModal();
      });

      buttonElement.appendChild(editButton);
      buttonElement.appendChild(deleteButton);

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
      console.log('selectedFoods', selectedFoods);
    });

    buttons.forEach((button, index) => {
      button.addEventListener('click', (evt) => {
        evt.preventDefault();

        buttons.forEach((button) => {
          button.classList.remove('selected');
          allButton.classList.remove('selected');
        });

        button.classList.add('selected');

        selectedFoods = [];

        const categoryId = index + 1;

        selectedFoods = productsByCategory[categoryId];

        if (selectedFoods.length === 0) {
          foodsDiv.innerHTML =
            '<p>No products available for this category.</p>';
        } else {
          displayFoods(selectedFoods);
          console.log('selectedFoods', selectedFoods);
        }
      });
    });

    const searchBar = document.querySelector('.search-input');

    searchBar.addEventListener('input', (evt) => {
      const searchValue = evt.target.value.toLowerCase();

      const filteredProducts = selectedFoods.filter((product) => {
        return product.name.toLowerCase().includes(searchValue);
      });
      displayFoods(filteredProducts);
      console.log('filteredProducts', filteredProducts);
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
      const selectElement = document.createElement('select');

      const editTitleLabel = document.createElement('label');
      const editDescriptionLabel = document.createElement('label');
      const editPriceLabel = document.createElement('label');
      const editImageLabel = document.createElement('label');
      const selectLabel = document.createElement('label');

      editTitleLabel.textContent = 'Title';
      editDescriptionLabel.textContent = 'Description';
      editPriceLabel.textContent = 'Price';
      editImageLabel.textContent = 'Image';
      selectLabel.textContent = 'Category';

      editTitle.value = food.name;
      editDescription.value = food.description;
      editPrice.value = food.price;
      editImage.value = food.file;

      editImage.type = 'file';
      editImage.accept = 'image/*';

      editTitle.classList.add('modal-input');
      editDescription.classList.add('modal-input');
      editPrice.classList.add('modal-input');
      editImage.classList.add('modal-input');

      let selectedFile = null;

      const imagePreview = document.createElement('div');
      imagePreview.classList.add('file-preview');
      const img = document.createElement('img');
      img.src = imageUrl + food.file;
      imagePreview.appendChild(img);

      editImage.addEventListener('change', (evt) => {
        selectedFile = evt.target.files[0];
        img.src = URL.createObjectURL(selectedFile);
      });

      selectElement.innerHTML = '';

      for (let i = 0; i < allCategories.length; i++) {
        const option = document.createElement('option');
        option.value = allCategories[i].categoryId;
        option.textContent = allCategories[i].name;

        selectElement.add(option);
      }

      selectElement.value = food.categoryId;

      editForm.appendChild(imagePreview);

      editForm.appendChild(editTitleLabel);
      editForm.appendChild(editTitle);

      editForm.appendChild(editDescriptionLabel);
      editForm.appendChild(editDescription);

      editForm.appendChild(editPriceLabel);
      editForm.appendChild(editPrice);

      editForm.appendChild(editImageLabel);
      editForm.appendChild(editImage);

      editForm.appendChild(selectLabel);
      editForm.appendChild(selectElement);

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('modal-button');

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('modal-button');
      deleteButton.style.backgroundColor = 'red';

      editButton.addEventListener('click', async (evt) => {
        evt.preventDefault();
        modifyProduct(
          food.productId,
          editTitle.value,
          editDescription.value,
          editPrice.value,
          selectedFile,
          selectElement.value
        );
      });

      deleteButton.addEventListener('click', async (evt) => {
        evt.preventDefault();

        deleteProduct(food.productId);
      });

      foodEditContent.appendChild(editForm);
      foodEditContent.appendChild(editButton);
      foodEditContent.appendChild(closeButton);
      foodEditContent.appendChild(deleteButton);

      foodEdit.appendChild(foodEditContent);
      foodEdit.showModal();
    });

    articleElement.appendChild(imageElement);
    articleElement.appendChild(titleElement);
    articleElement.appendChild(descriptionElement);
    articleElement.appendChild(priceElement);

    foodsDiv.appendChild(articleElement);
  });
};

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

const foodEdit = document.querySelector('.food-edit');
const foodEditContent = document.querySelector('.food-edit-content');

const modifyProduct = async (
  productId,
  name,
  description,
  price,
  file,
  categoryId
) => {
  const updatedProduct = {
    name: name,
    description: description,
    price: price,
    file: file,
    categoryId: categoryId,
  };

  const formData = new FormData();
  formData.append('name', updatedProduct.name);
  formData.append('description', updatedProduct.description);
  formData.append('price', updatedProduct.price);
  if (updatedProduct.file) formData.append('file', updatedProduct.file);
  formData.append('categoryId', updatedProduct.categoryId);

  try {
    const token =
      localStorage.getItem('token') ?? sessionStorage.getItem('token');
    const response = await fetch(`${url}/products/${productId}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    });

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
};

const addProduct = async (name, description, price, file, categoryId) => {
  let formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('file', file);
  formData.append('categoryId', categoryId);

  try {
    const token =
      localStorage.getItem('token') ?? sessionStorage.getItem('token');
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
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
const addCategoryButton = document.querySelector('.add-category-button');

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

const createCategory = async (name, file) => {
  try {
    console.log('file', file);
    const token =
      localStorage.getItem('token') ?? sessionStorage.getItem('token');

    const formData = new FormData();

    formData.append('name', name);
    formData.append('file', file);

    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    };

    const response = await fetch(`${url}/categories`, options);

    if (response.ok) {
      alert('Category added successfully');
      window.location.reload();
    } else {
      console.error('Error adding category');
    }
  } catch (error) {
    console.error(error);
  }
};

const modifyCategory = async (name, file, id) => {
  try {
    const token =
      localStorage.getItem('token') ?? sessionStorage.getItem('token');

    const formData = new FormData();

    formData.append('name', name);
    if (file) formData.append('file', file);

    const options = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    };

    const response = await fetch(`${url}/categories/${id}`, options);

    if (response.ok) {
      alert('Category updated successfully');
      window.location.reload();
    } else {
      console.error('Error updating category');
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteCategory = async (id) => {
  try {
    const token =
      localStorage.getItem('token') ?? sessionStorage.getItem('token');

    if (!token) {
      alert('You need to be logged in to delete a category');
      return;
    }

    const products = await getAllProducts();

    const categoryProducts = products.filter(
      (product) => product.categoryId === id
    );

    if (categoryProducts.length > 0) {
      alert('Category has products. Please delete products first');
      return;
    }

    if (
      window.confirm('Are you sure you want to delete this category?') === false
    ) {
      return;
    }

    const options = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const response = await fetch(`${url}/categories/${id}`, options);

    if (response.status === 200) {
      alert('Category deleted successfully');
      window.location.reload();
    }
  } catch (error) {
    alert('Error deleting category');
  }
};

addCategoryButton.addEventListener('click', async (evt) => {
  console.log('add category');
  evt.preventDefault();

  const dialogElement = document.createElement('dialog');
  dialogElement.classList.add('add-dialog');

  const closeButton = document.createElement('button');
  closeButton.textContent = 'X';
  closeButton.classList.add('close-button');

  closeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    dialogElement.close();
  });

  const headerElement = document.createElement('h2');
  headerElement.textContent = 'Add new category';

  const imagePreview = document.createElement('div');
  imagePreview.classList.add('file-preview');

  const formElement = document.createElement('form');
  formElement.classList.add('add-category-form');

  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.placeholder = 'Category name';
  inputElement.required = true;
  inputElement.classList.add('modal-input');
  inputElement.classList.add('category-input');

  const submitElement = document.createElement('button');
  submitElement.textContent = 'Add';
  submitElement.classList.add('modal-button');
  submitElement.classList.add('category-submit');

  const imageElement = document.createElement('input');
  imageElement.type = 'file';
  imageElement.accept = 'image/*';

  imageElement.addEventListener('change', (evt) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = document.createElement('img');
      image.src = reader.result;
      imagePreview.innerHTML = '';
      imagePreview.appendChild(image);
    };

    reader.readAsDataURL(imageElement.files[0]);
  });

  submitElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    createCategory(inputElement.value, imageElement.files[0]);
  });

  formElement.appendChild(headerElement);
  formElement.appendChild(imagePreview);
  formElement.appendChild(inputElement);
  formElement.appendChild(imageElement);
  formElement.appendChild(submitElement);

  dialogElement.appendChild(closeButton);
  dialogElement.appendChild(formElement);

  document.body.appendChild(dialogElement);

  dialogElement.showModal();
});

window.onload = async () => {
  await fetchAndAddProducts();
  await displayFoods(products);
};
