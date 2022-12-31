const formulario = document.querySelector("#formulario_preguntas");

const socket = io();

document.addEventListener("submit", (e) => {
  e.preventDefault();
  const encuestado = {
    sexo: formulario.sexo.value,
    horas_trabajo_semana_anterior:
      formulario.horas_trabajo_semana_anterior.value,
    horas_trabajo_disponible: formulario.horas_trabajo_disponible.value,
    recibe_alimentacion: formulario.recibe_alimentacion.value,
    recibe_vacaciones: formulario.recibe_vacaciones.value,
    recibe_seguro: formulario.recibe_seguro.value,
    numero_trabajadores: formulario.numero_trabajadores.value,
    tiene_ruc: formulario.tiene_ruc.value,
    horas_trabajo: formulario.horas_trabajo.value,
    ingresos_laborales: formulario.ingresos_laborales.value,
  };
  socket.emit("agregar-encuesta", encuestado);
});
