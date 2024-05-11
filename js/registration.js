const url = 'https://10.120.32.54/app/api/v1';

const registerForm = document.querySelector('.registration-form');

registerForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  await register();
});

const register = async () => {
  try {
    const data = {
      name: document.querySelector('.register-username').value,
      address: document.querySelector('.register-address').value,
      email: document.querySelector('.register-email').value,
      password: document.querySelector('.register-pswd').value,
      role: 'user',
    };

    for (const key in data) {
      if (data[key] === '') {
        alert('Please fill in all fields');
        return;
      }
    }

    const confirmPswd = document.querySelector('.register-confirm-pswd').value;

    if (data.password !== confirmPswd) {
      alert('Passwords do not match');
      return;
    }

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url + '/auth/register', fetchOptions);
    const json = await response.json();

    if (response.status === 201) {
      alert('Registration successful');
      window.location.href = 'login.html';
    } else if (response.status === 400) {
      alert(json.message);
    }

    if (json.error) {
      alert(json.error.message);
    }
  } catch (error) {}
};
