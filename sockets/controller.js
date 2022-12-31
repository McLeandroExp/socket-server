const EncuestaControl = require("../models/encuesta-control");
const encuestaControl = new EncuestaControl();
const socketController = (socket) => {
  socket.emit("encuestas", encuestaControl.encuestas);
  socket.emit("ultimos-mostrados", encuestaControl.ultimosMostrados);

  socket.on("agregar-encuesta", (encuestado, callback) => {
    encuestaControl.agregarEncuesta(encuestado);
    socket.broadcast.emit(
      "ultimos-mostrados",
      encuestaControl.ultimosMostrados
    );
  });
};
module.exports = {
  socketController,
};
