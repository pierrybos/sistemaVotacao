import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: true,
    methods: ["GET", "POST"]
  }
});

// Serve static files from the dist directory
app.use(express.static(join(__dirname, '../dist')));

// Handle React Router routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

let votingEnabled = false;
let currentNumber = null;
let currentResults = {
  hot: 0,
  cold: 0,
  good: 0,
  bad: 0
};

// Store voting history
const votingHistory = [];

io.on('connection', (socket) => {
  console.log('Client connected');

  // Send current voting state and history to new connections
  socket.emit('votingState', { 
    enabled: votingEnabled, 
    results: currentResults,
    currentNumber,
    history: votingHistory 
  });

  // Handle request for initial state
  socket.on('getState', () => {
    socket.emit('votingState', { 
      enabled: votingEnabled, 
      results: currentResults,
      currentNumber,
      history: votingHistory 
    });
  });

  socket.on('startVoting', ({ number }) => {
    console.log('Starting voting for number:', number);
    votingEnabled = true;
    currentNumber = number;
    currentResults = { hot: 0, cold: 0, good: 0, bad: 0 };
    io.emit('votingState', { 
      enabled: true, 
      results: currentResults,
      currentNumber,
      history: votingHistory 
    });
  });

  socket.on('stopVoting', () => {
    console.log('Stopping voting');
    votingEnabled = false;
    
    // Save current results to history
    if (currentNumber !== null) {
      votingHistory.unshift({
        number: currentNumber,
        results: { ...currentResults },
        timestamp: new Date()
      });
    }

    currentNumber = null;
    io.emit('votingState', { 
      enabled: false, 
      results: currentResults,
      currentNumber,
      history: votingHistory 
    });
  });

  socket.on('vote', ({ temperature, quality }) => {
    console.log('Received vote:', { temperature, quality });
    if (!votingEnabled) return;

    // Update current results
    if (temperature === 'hot') currentResults.hot++;
    if (temperature === 'cold') currentResults.cold++;
    if (quality === 'good') currentResults.good++;
    if (quality === 'bad') currentResults.bad++;

    console.log('Updated results:', currentResults);
    // Broadcast updated results
    io.emit('results', currentResults);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});