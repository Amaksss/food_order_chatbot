const express = require('express');
const { createServer } = require('node:http');
const { join } = require('path');
const { Server } = require('socket.io');


const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});



io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.emit('chat message', 'Welcome to XYZ Restaurant! Please select your order: 1. Pizza, 2. Ice Cream, 3. Vanilla Shake');
})  

const orders = {
    1: 'Pizza',
    2: 'Ice Cream',
    3: 'Vanilla Shake'
};

io.on('connection', (socket) => {
    let currentOrder = null;


    socket.on('chat message', (msg) => {
        if (!currentOrder) {
            const orderNumber = parseInt(msg);
            if (orders[orderNumber]) {
                currentOrder = orders[orderNumber];
                socket.emit('chat message', `You have selected ${currentOrder}. Type 1 to add another item, 99 to checkout, or 00 to cancel.`);
            } else {
                socket.emit('chat message', 'Invalid selection. Please type 1 for Pizza, 2 for Ice Cream, 3 for Vanilla Shake.');
            }
        } else {
            if (msg === '1') {
                currentOrder = null;
                socket.emit('chat message', 'Please type the number to select your order: 1 for Pizza, 2 for Ice Cream, 3 for Vanilla Shake.');
            } else if (msg === '99') {
                socket.emit('chat message', `Your order for ${currentOrder} has been placed. Thank you!`);
                currentOrder = null;
            } else if (msg === '00') {
                socket.emit('chat message', 'Your order has been cancelled.');
                currentOrder = null;
            } else {
                socket.emit('chat message', 'Invalid selection. Type 1 to add another item, 99 to checkout, or 00 to cancel.');
            }
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });