const url = 'https://10.120.32.54/app/api/v1';

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

navigator.geolocation.getCurrentPosition(function (position) {
  console.log(position);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  var marker = L.marker([
    position.coords.latitude,
    position.coords.longitude,
  ]).addTo(map);

  map.setView([position.coords.latitude, position.coords.longitude], 15);
});

const getOrders = async () => {
  try {
    const response = await fetch(url + '/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log('orders', data);
      return data;
    } else {
      console.error('Error:', response);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const getOrderItems = async () => {
  try {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');

    const response = await fetch(url + '/orderItems', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }

    console.error('Error:', response);
  } catch (error) {
    console.error('Error:', error);
  }
};

const getProducts = async () => {
  try {
    const response = await fetch(url + '/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error:', response);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const getCustomer = async (token) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    const response = await fetch(url + '/auth/me', options);

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error:', response);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const updateOrderStatus = async (orderId, statusCode) => {
  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({status_code: statusCode}),
  };

  const response = await fetch(url + '/orders/' + orderId + '/status', options);

  if (response.status === 200) {
    const data = await response.json();
    console.log('order status', data);
    return data;
  } else {
    console.error('Error:', response);
  }
};

const startOrderTimers = async (orderId, statusCode) => {
  //const orderTimer = document.getElementById('order-timer');
  const orderText = document.getElementById('order-status');

  switch (statusCode) {
    case 1:
      orderText.textContent = 'Order is being prepared';
      let randomTime1 = Math.floor(Math.random() * 30) + 10;
      let timeLeft1 = randomTime1;

      const timer1 = setInterval(async () => {
        timeLeft1--;
        //orderTimer.textContent = timeLeft1;

        if (timeLeft1 <= 0) {
          clearInterval(timer1);
          orderText.textContent = 'Order is ready for pickup';
          await updateOrderStatus(orderId, 2);
          startOrderTimers(orderId, 2); // Start timer for next status
        }
      }, 1000); // Update every second
      break;

    case 2:
      orderText.textContent = 'Order is ready for pickup';
      let randomTime2 = Math.floor(Math.random() * 15) + 10;
      let timeLeft2 = randomTime2;

      const timer2 = setInterval(async () => {
        timeLeft2--;
        //orderTimer.textContent = timeLeft2;

        if (timeLeft2 <= 0) {
          clearInterval(timer2);
          orderText.textContent = 'Order has been picked up';
          await updateOrderStatus(orderId, 3);
          startOrderTimers(orderId, 3); // Start timer for next status
        }
      }, 1000); // Update every second
      break;

    case 3:
      orderText.textContent = 'Order has been picked up';
      //orderTimer.textContent = '';
      let randomTime3 = Math.floor(Math.random() * 10) + 10;
      let timeLeft3 = randomTime3;

      const timer3 = setInterval(async () => {
        timeLeft3--;
        //orderTimer.textContent = timeLeft3;

        if (timeLeft3 <= 0) {
          clearInterval(timer3);
          orderText.textContent = 'Order has been delivered';
          await updateOrderStatus(orderId, 4);

          orderText.textContent = 'Order has been delivered';
          const homeButton = document.querySelector('.home-button');
          homeButton.style.display = 'block';

          homeButton.addEventListener('click', async () => {
            window.location.href = 'main.html';
          });
        }
      }, 1000); // Update every second
      break;

    default:
      console.error('Invalid status code');
      break;
  }
};

window.addEventListener('load', async () => {
  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  if (token) {
    const customer = await getCustomer(token);
    const orders = await getOrders();
    const orderItems = await getOrderItems();
    const products = await getProducts();

    if (customer) {
      const name = customer.customer.name;
      const email = customer.customer.email;
      const address = customer.customer.address;

      document.getElementById('name').textContent = 'Name: ' + name;
      document.getElementById('email').textContent = 'Email: ' + email;
      document.getElementById('address').textContent = 'Address: ' + address;

      if (orders) {
        let customerOrder;

        orders.forEach((order) => {
          if (order.customerId === customer.customer.customerId) {
            if (order.status_code !== 4) {
              customerOrder = order;
            }
          }
        });

        if (customerOrder) {
          const orderedItems = [];

          orderItems.forEach((orderItem) => {
            if (orderItem.orderId === customerOrder.orderId) {
              orderedItems.push(orderItem);
            }
          });

          if (orderedItems) {
            let totalPrice = 0;

            const productList = document.querySelector('.product-list');

            const th1 = document.createElement('th');
            const th2 = document.createElement('th');
            const th3 = document.createElement('th');

            productList.appendChild(th1);
            productList.appendChild(th2);
            productList.appendChild(th3);

            orderedItems.forEach((orderedItem) => {
              products.forEach((product) => {
                if (orderedItem.productId === product.productId) {
                  const tr = document.createElement('tr');
                  const td1 = document.createElement('td');
                  const td2 = document.createElement('td');
                  const td3 = document.createElement('td');

                  th1.textContent = 'Product Name';
                  th2.textContent = 'Price';
                  th3.textContent = 'Quantity';

                  td1.textContent = product.name;
                  td2.textContent = product.price + ' €';
                  td3.textContent = orderedItem.quantity;

                  totalPrice += product.price * orderedItem.quantity;

                  tr.appendChild(td1);
                  tr.appendChild(td2);
                  tr.appendChild(td3);

                  productList.appendChild(tr);
                }
              });
            });

            const totalRow = document.createElement('tr');
            const totalCell = document.createElement('td');
            totalCell.colSpan = 3;
            totalCell.textContent = 'Total: ' + totalPrice + ' €';
            totalRow.appendChild(totalCell);
            productList.appendChild(totalRow);
          }

          // start order timers
          startOrderTimers(customerOrder.orderId, customerOrder.status_code);
        }
      }
    }
  } else {
    alert('You need to login first');
    window.location.href = '/login.html';
  }
});
