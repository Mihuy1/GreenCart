const smileyModal = document.querySelector('.smiley-modal');
const completeButton = document.querySelector('.complete-button');

const INPUTS = document.querySelectorAll('#smileys input');
const updateValue = (e) =>
  (document.querySelector('#result').innerHTML = e.target.value);

INPUTS.forEach((el) => el.addEventListener('click', (e) => updateValue(e)));

completeButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  smileyModal.close();
});
