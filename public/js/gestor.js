//variables html
const survey_questions = document.querySelector(".survey_questions");
const surveys_container = document.querySelector(".surveys_container");
const surveys_table = document.querySelector(".surveys_table");

const socket = io();
socket.on("ultimos-mostrados", (ultimos_mostrados, callback) => {
  console.log(ultimos_mostrados);
  const $fragment = document.createDocumentFragment();
  ultimos_mostrados.forEach((encuestado) => {
    const $tr = document.createElement("tr");
    const arrEncuestado = Object.values(encuestado);
    for (const value of arrEncuestado) {
      const $td = document.createElement("td");
      $td.classList.add("cell");
      $td.innerText = value;
      $tr.appendChild($td);
    }
    $fragment.prepend($tr);
  });
  surveys_table.appendChild($fragment);
});
