const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

io.on('connection', (socket) => {
  console.log('Cliente conectado ', socket.id);

  socket.on('mensaje', (data) => {
    console.log('Mensaje recibido:', data);
    io.emit('mensaje', data);
  });


  //Evento para Nuevo Producto
  socket.on('producto_nuevo', (producto) => {
    console.log('Producto nuevo: ', producto);

    //Reenvia a todos los clientes conectados
    io.emit('producto_nuevo', producto);

  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado ', socket.id);
  });
});

// Usar el puerto asignado por Render
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor WebSocket corriendo en http://localhost:${port}`);
});
