const url = 'https://10.120.32.54/app/api/v1';
const imageUrl = 'https://10.120.32.54/app/uploads/';

let products = [];

const addProducts = async () => {
  try {
    const response = await fetch(`${url}/products`);
    const data = await response.json();

    if (response.status === 200) {
      console.log('Data:', data);
      products.push(...data);
    } else {
      console.error('Error');
    }
  } catch (error) {
    console.error(error);
  }
};

const updateProductList = async (productId, quantity) => {
  const product = await getById(productId);
  console.log('product homma', product[0]);

  const cartItemBoxDiv = document.querySelector('.cart-item-box');

  const productCardDiv = document.createElement('div');
  productCardDiv.classList.add('product-card');

  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  const imgBoxDiv = document.createElement('div');
  imgBoxDiv.classList.add('img-box');

  const img = document.createElement('img');
  img.classList.add('product-img');
  img.src = imageUrl + product[0].file;

  const detailDiv = document.createElement('div');
  detailDiv.classList.add('detail');

  const productName = document.createElement('h4');
  productName.classList.add('product-name');
  productName.textContent = product[0].name;

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('wrapper');

  const productQtyDiv = document.createElement('div');
  productQtyDiv.classList.add('product-qty');

  const decreaseBtn = document.createElement('button');
  decreaseBtn.classList.add('decrement');

  const decreaseIcon = document.createElement('ion-icon');
  decreaseIcon.name = 'remove-outline';

  decreaseBtn.appendChild(decreaseIcon);

  const quantitySpan = document.createElement('span');
  quantitySpan.classList.add('quantity');
  quantitySpan.textContent = quantity;

  const increaseBtn = document.createElement('button');
  increaseBtn.classList.add('increment');

  const increaseIcon = document.createElement('ion-icon');
  increaseIcon.name = 'add-outline';

  increaseBtn.appendChild(increaseIcon);

  const priceDiv = document.createElement('div');

  const priceSpan = document.createElement('span');
  priceSpan.classList.add('price');
  priceSpan.textContent = product[0].price * quantity;

  const removeBtn = document.createElement('button');
  removeBtn.classList.add('product-close-btnn');
  removeBtn.style.cursor = 'pointer';

  const removeIcon = document.createElement('ion-icon');
  removeIcon.name = 'close-outline';

  removeBtn.appendChild(removeIcon);

  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  increaseBtn.addEventListener('click', () => {
    quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
    const shoppingCartData =
      JSON.parse(sessionStorage.getItem(`shoppingCart_${token}`)) || [];

    const index = shoppingCartData.findIndex(
      (item) => item.productId === product[0].productId
    );

    shoppingCartData[index].quantity = parseInt(quantitySpan.textContent);

    priceSpan.textContent =
      product[0].price * parseInt(quantitySpan.textContent);

    sessionStorage.setItem(
      `shoppingCart_${token}`,
      JSON.stringify(shoppingCartData)
    );

    updateTotal();
  });

  decreaseBtn.addEventListener('click', () => {
    if (parseInt(quantitySpan.textContent) > 1) {
      quantitySpan.textContent = parseInt(quantitySpan.textContent) - 1;
      const shoppingCartData =
        JSON.parse(sessionStorage.getItem(`shoppingCart_${token}`)) || [];

      const index = shoppingCartData.findIndex(
        (item) => item.productId === product[0].productId
      );

      shoppingCartData[index].quantity = parseInt(quantitySpan.textContent);

      priceSpan.textContent =
        product[0].price * parseInt(quantitySpan.textContent);

      sessionStorage.setItem(
        `shoppingCart_${token}`,
        JSON.stringify(shoppingCartData)
      );
    }

    updateTotal();
  });

  removeBtn.addEventListener('click', () => {
    const shoppingCartData =
      JSON.parse(sessionStorage.getItem(`shoppingCart_${token}`)) || [];

    const index = shoppingCartData.findIndex(
      (item) => item.productId === product[0].productId
    );

    shoppingCartData.splice(index, 1);

    sessionStorage.setItem(
      `shoppingCart_${token}`,
      JSON.stringify(shoppingCartData)
    );

    productCardDiv.remove();

    updateTotal();
  });

  productQtyDiv.appendChild(decreaseBtn);
  productQtyDiv.appendChild(quantitySpan);
  productQtyDiv.appendChild(increaseBtn);

  priceDiv.appendChild(priceSpan);

  wrapperDiv.appendChild(productQtyDiv);
  wrapperDiv.appendChild(priceDiv);

  detailDiv.appendChild(productName);
  detailDiv.appendChild(wrapperDiv);

  imgBoxDiv.appendChild(img);

  cardDiv.appendChild(imgBoxDiv);
  cardDiv.appendChild(detailDiv);
  cardDiv.appendChild(removeBtn);

  productCardDiv.appendChild(cardDiv);

  cartItemBoxDiv.appendChild(productCardDiv);
};

const getById = async (productId) => {
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

const updateTotal = () => {
  const totalSpan = document.getElementById('total-text-span');

  console.log('totalSpan', totalSpan);

  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  const shoppingCartData =
    JSON.parse(sessionStorage.getItem(`shoppingCart_${token}`)) || [];

  let total = 0;

  shoppingCartData.forEach(async (item) => {
    const product = await getById(item.productId);
    total += product[0].price * item.quantity;

    totalSpan.innerHTML = total;
  });

  if (shoppingCartData.length === 0) {
    totalSpan.innerHTML = 0;
  }
};

const getMe = async () => {
  try {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');

    const response = await fetch(`${url}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Data:', data);
      return data;
    } else {
      console.error('Error fetching user');
    }
  } catch (error) {
    console.error(error);
  }
};

const createOrder = async (customerId, price, orderDate) => {
  try {
    const data = {
      customerId: customerId,
      orderDate: orderDate,
      price: price,
      status_code: 1,
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(`${url}/orders`, fetchOptions);
    const json = await response.json();

    if (response.status === 201) {
      return json;
    } else {
      console.error('Error creating order');
    }
  } catch (error) {
    console.error(error);
  }
};

const orderButton = document.querySelector('.order-button');

orderButton.addEventListener('click', async () => {
  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  const shoppingCartData =
    JSON.parse(sessionStorage.getItem(`shoppingCart_${token}`)) || [];

  const customer = await getMe();

  const orderDate = new Date().toISOString().slice(0, 10);

  const price = parseInt(
    document.getElementById('total-text-span').textContent
  );

  const order = await createOrder(
    customer.customer[0].customerId,
    price,
    orderDate
  );

  const orderDetailPromises = shoppingCartData.map(async (item) => {
    const product = await getById(item.productId);

    const data = {
      orderId: order.result.orderId,
      productId: product[0].productId,
      quantity: item.quantity,
      price: product[0].price,
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(`${url}/orderItems`, fetchOptions);

    if (response.status === 201) {
      console.log('Order detail created');
    } else {
      console.error('Error creating order detail');
    }
  });

  // Wait for all order detail creations to finish
  await Promise.all(orderDetailPromises);

  sessionStorage.removeItem(`shoppingCart_${token}`);

  window.location.href = 'order.html';
});
window.onload = async () => {
  await addProducts();

  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  if (token) {
    const shoppingCartData =
      JSON.parse(sessionStorage.getItem(`shoppingCart_${token}`)) || [];

    console.log(shoppingCartData);

    shoppingCartData.forEach(async (item) => {
      console.log(item);
      const product = await getById(item.productId);
      updateProductList(product[0].productId, item.quantity);
    });

    updateTotal();
  }
};
