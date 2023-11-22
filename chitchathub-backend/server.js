//imports 
const express = require('express');
// instantiate
const app = express();

// Rooms 
const rooms = ['general', 'tech', 'finance', 'crypto']; 
const cors = require('cors');

// To receive data from the frontend
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// To make a connection between frontend and backend
app.use(cors());

// Server
const server = require('http').createServer(app); 
// Port no.
const PORT = 5001;
// Circuit
const io = require('socket.io')(server, {
    cors: {
        origin: 'https://localhost:3000', 
        methods: ['GET', 'POST']
    }
});

// Rest of your code...

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
