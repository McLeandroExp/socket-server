const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");
class EncuestaControl {
  constructor() {
    this.numMostrados = 20;
    this.ultimo = 0;
    this.encuestas = [];
    this.ultimosMostrados = [];
    this.init();
  }
  get toJson() {
    return {
      ultimo: this.ultimo,
      encuestas: this.encuestas,
      ultimosMostrados: this.ultimosMostrados,
    };
  }
  init() {
    const dbPath = path.join(__dirname, "../data/encuestados.xlsx");
    const excel = xlsx.readFile(dbPath);
    const nombreHoja = excel.SheetNames;
    const encuestas = xlsx.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);

    const { ultimo, ultimosMostrados } = require("../data/data.json");
    this.encuestas = encuestas;
    this.ultimo = ultimo;
    this.ultimosMostrados = ultimosMostrados;
    for (let i = 0; i < encuestas.length; i++) {
      if (i < this.numMostrados) {
        this.ultimosMostrados.unshift(encuestas[i]);
      } else break;
    }
  }
  guardarDB() {
    const dbPathJson = path.join(__dirname, "../data/data.json");
    fs.writeFileSync(dbPathJson, JSON.stringify(this.toJson));

    const worksheet = xlsx.utils.json_to_sheet(this.encuestas);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "encuestados");
    xlsx.writeFile(workbook, "../data/encuestados.xlsx");
  }
  agregarEncuesta(encuesta) {
    if (this.ultimosMostrados.length < this.numMostrados - 1) {
      this.ultimosMostrados.unshift(encuesta);
    } else {
      this.ultimosMostrados.unshift(encuesta);
      this.ultimosMostrados.pop();
    }
  }
}
module.exports = EncuestaControl;
