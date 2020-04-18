import io from 'socket.io-client';

const socket = io('%%API_URL%%', { forceNew: true });
// adminSocket.connect();

// adminSocket.send('hello');

// const socket = io();

socket.on('connect', () => {
  console.log('Got a connection');
  socket.emit('message', 'hello', (messageBack:string) => {
    console.log(messageBack);
  });
  socket.on('message', (msg:string) => {
    console.log(msg);
  });
});

