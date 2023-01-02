const EncuestaControl = require("../models/encuesta-control");
const encuestaControl = new EncuestaControl();
const socketController = (socket) => {
  // socket.emit("encuestas", encuestaControl.encuestas);
  socket.emit("enviar-encuestas", encuestaControl);
  socket.on("agregar-encuesta", (encuestado) => {
    encuestaControl.agregarEncuesta(encuestado);
    encuestaControl.guardarDB();
    socket.broadcast.emit("enviar-encuestas", encuestaControl);
  });
};
module.exports = {
  socketController,
};
