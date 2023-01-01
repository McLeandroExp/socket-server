const EncuestaControl = require("../models/encuesta-control");
const encuestaControl = new EncuestaControl();
const socketController = (socket) => {
  // socket.emit("encuestas", encuestaControl.encuestas);
  socket.emit("enviar-encuestas", encuestaControl);
  console.log("se ejecuto enviar-encuestas");
  socket.on("agregar-encuesta", (encuestado) => {
    encuestaControl.agregarEncuesta(encuestado);
    encuestaControl.guardarDB();
    socket.broadcast.emit("enviar-encuestas", encuestaControl);
    console.log("se ejecuto agregar-encuesta");
  });
};
module.exports = {
  socketController,
};
