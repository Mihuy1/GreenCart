const url = 'https://10.120.32.54/app/api/v1';

const loginForm = document.querySelector('.login-form');
const failText = document.querySelector('.fail-login-text');

loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  await login();
});

const login = async () => {
  try {
    const data = {
      name: document.getElementById('login-username').value,
      password: document.getElementById('login-pswd').value,
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url + '/auth/login', fetchOptions);
    const json = await response.json();

    if (response.status === 200) {
      const rememberMe = document.getElementById('remember-me-label').checked;

      console.log('rememberMe:', rememberMe);

      if (rememberMe) {
        console.log('localStorage');
        localStorage.setItem('token', json.token);
      } else {
        console.log('sessionStorage');
        sessionStorage.setItem('token', json.token);
      }

      window.location.href = 'main.html';
    } else {
      failText.textContent = json.message;
      failText.style.visibility = 'visible';
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};
