import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:5051');

export default socket;
