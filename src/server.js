const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // permite conexiones desde cualquier origen (web/app)
  }
});

// Cuando un cliente se conecta
io.on('connection', (socket) => {
  console.log('Cliente conectado ✅', socket.id);

  // Escuchar mensajes simples
  socket.on('mensaje', (data) => {
    console.log('Mensaje recibido:', data);

    // Reenviar a todos los conectados
    io.emit('mensaje', data);
  });

  // Al desconectarse
  socket.on('disconnect', () => {
    console.log('Cliente desconectado ❌', socket.id);
  });
});

// Levantar el servidor
server.listen(3000, () => {
  console.log('Servidor WebSocket corriendo en http://localhost:3000');
});
