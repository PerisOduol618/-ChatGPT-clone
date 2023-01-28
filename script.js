import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element) {
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300)
}

function typeText( element, text){
  let index = 0;
  let inteval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.chartAt(index);
      index++;
    }else {
      clearInterval(inteval);
    }
  }, 20)
}

function generateUniqueId(){
  const timestamp = Date.now();
  const randomNumber = Math.random;
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

function chatstripe  (isAi, value, uniqueId) {
  return (
    `
    <div class='wrapper ${isAi && 'ai'}'>
    <div class='chat'>
    <div class='profile'>
    <img
    src="${isAi ? bot : user}"
    alt="${isAi ? bot : user}"
    />
    </div>
    <div class='message' id=${uniqueId}>${value}</div>
    </div>
    </div>
    `
  )
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // generate user's chatstripe
  chatContainer.innerHTML += chatstripe(false, data.get('prompt'));

  // clear textarea input
  form.reset();

  // generate bot chatstripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatstripe(true,"",uniqueId);

  // put the new message in view
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // fetch the newly created div
  const messageDiv = document.getElementById(uniqueId);

  // turn on the loader
  loader(messageDiv);
}


form.addEventListener('submit', handleSubmit);
// enter button
form.addEventListener('keyup', (e) =>{
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
})