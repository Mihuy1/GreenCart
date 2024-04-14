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
