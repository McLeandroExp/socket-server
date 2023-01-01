//variables html
const surveys_table = document.querySelector(".surveys_table");
const socket = io();
socket.on("enviar-encuestas", ({ numMostrados, encuestas }) => {
  surveys_table.innerHTML = "";
  console.log("encuestas.length : ", encuestas.length);

  const $trheader = document.createElement("tr");
  const $fragment = document.createDocumentFragment();
  const $x = document.createElement("th");
  $x.innerText = "Numero de participante";
  $x.classList.add("cell");
  $trheader.append($x);
  for (let i = 0; i < numMostrados; i++) {
    const $th_row = document.createElement("th");
    $th_row.innerText = `Pregunta ${i + 1}`;
    $th_row.classList.add("cell");
    $trheader.appendChild($th_row);
  }
  $fragment.append($trheader);

  for (let i = 0; i < numMostrados; i++) {
    const encuestado = encuestas[i];
    const $tr = document.createElement("tr");
    $tr.classList.add("elementos_tablas");
    const arrEncuestado = Object.values(encuestado);
    arrEncuestado.unshift(i + 1);
    for (const value of arrEncuestado) {
      const $td = document.createElement("td");
      $td.classList.add("cell");
      $td.innerText = value;
      $tr.appendChild($td);
    }
    $fragment.append($tr);
  }
  surveys_table.appendChild($fragment);
});
