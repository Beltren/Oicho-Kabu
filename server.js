const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const eventEmitter = require('./eventEmitter'); // Import the event emitter

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 3001;

const playersRoutes = require('./routes/playerRoutes');
const rulesRoutes = require('./routes/ruleRoutes');
const betsRoutes = require('./routes/betRoutes');
const availableBetRoutes = require('./routes/availableBetRoutes');
const payRoutes = require('./routes/payRoutes');
const playerPageRoutes = require('./routes/playerPageRoutes');
const ipRoutes = require('./routes/ipRoutes'); // New route for IP

// Middleware
app.use(bodyParser.json()); // Ensure this middleware is configured correctly
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Root route
app.get('/', (req, res) => {
    res.render('index');
});

// Routes
app.use('/players', playersRoutes);
app.use('/rules', rulesRoutes);
app.use('/bets', betsRoutes);
app.use('/availableBet', availableBetRoutes);
app.use('/pay', payRoutes);
app.use('/pictures', express.static(path.join(__dirname, 'pictures')));
app.use('/players-page', playerPageRoutes);
app.use('/ip', ipRoutes); // Use the new route

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

eventEmitter.on('updatePlayerPoints', () => {
    io.emit('updatePlayerPoints');
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
