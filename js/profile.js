'use strict';

const url = 'https://10.120.32.54/app/api/v1';

const form = document.querySelector('.update-info-form');

const username = document.querySelector('#name');
const email = document.querySelector('#email');
const address = document.querySelector('#address');
const password = document.querySelector('#password');

let customerId = null;

const token = localStorage.getItem('token') ?? sessionStorage.getItem('token');

const getUserInfo = async () => {
  const response = await fetch(`${url}/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ` + token,
    },
  });

  if (response.status === 200) {
    const data = await response.json();

    customerId = data.customer[0].customerId;

    username.value = data.customer[0].name;
    if (data.customer.email === null) {
      email.value = '';
    } else {
      email.value = data.customer[0].email;
    }

    if (data.customer.address === null) {
      address.value = '';
    } else {
      address.value = data.customer[0].address;
    }
  } else {
    alert('Something went wrong');
  }
};

window.onload = async () => {
  await getUserInfo();
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    if (customerId === null) {
      alert('customer id not found');
      return;
    }
    const newInfo = {
      name: username.value,
      address: address.value,
      email: email.value,
      password: password.value,
      role: 'user',
    };

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      },
      body: JSON.stringify(newInfo),
    };

    const response = await fetch(`${url}/customers/${customerId}`, options);

    if (response.status === 200) {
      alert('Profile updated successfully');
      window.location.href = 'profile.html';
    } else {
      alert('Something went wrong');
    }
  } catch (error) {
    console.error(error);
  }
});
