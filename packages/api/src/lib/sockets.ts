import { Server } from 'socket.io';

export default (ioServer: Server) => {
  ioServer.on('connection', socket => {
    console.log('Got a connection');
    socket.send('User connected');
    socket.on('message', (msg: string, fn) => {
      console.log(msg);
      fn('Sever heard ' + msg +' and says Hello');
    });
  });
};
