

socket.on('connect', () => {
  console.log('Connected to server');
});

// Emit a test message to confirm the connection
socket.emit('chat message', 'Hello, server!');

// Log messages from the server
socket.on('chat message', (msg) => {
  console.log('Message from server:', msg);
});

socket.emit('chat message', 'Hello, server!');

socket.on('chat message', function(msg) {
    console.log('Message from server:', msg);
  });

const welcomeDiv = document.getElementById('welcome');
const chatDiv = document.getElementById('chat');
const proceedButton = document.getElementById('proceed');
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');


//add event listener to proceed button
proceedButton.addEventListener('click' , function() {
    welcomeDiv.style.display = 'none';
    chatDiv.style.display = 'flex';
    socket.emit('welcome');
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });

  socket.on('chat message', function(msg) {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
  