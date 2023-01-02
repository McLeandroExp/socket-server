//variables html
const surveys_table = document.querySelector(".surveys_table");

//instancia socket
const socket = io();

//elementos de pantalla
const width = window.innerWidth;
const minWidth = 700;

socket.on("enviar-encuestas", ({ numMostrados, encuestas }) => {
  surveys_table.innerHTML = "";

  const $trheader = document.createElement("tr");
  const $fragment = document.createDocumentFragment();
  const $x = document.createElement("th");
  $x.innerText = width >= minWidth ? "Numero de participante" : "N°";
  $x.classList.add("cell");
  $trheader.append($x);
  for (let i = 0; i < numMostrados; i++) {
    const $th_row = document.createElement("th");
    $th_row.innerText = width >= minWidth ? `Pregunta ${i + 1}` : `P${i + 1}`;
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
