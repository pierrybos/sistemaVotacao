import { io } from 'socket.io-client';

// Get the current window location origin for the socket connection
const serverUrl = window.location.origin;
export const socket = io(serverUrl);

// Add connection status logging
socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});