const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");
class EncuestaControl {
  constructor() {
    this.numMostrados = 10;
    // this.ultimo = 0;
    this.encuestas = [];
    this.init();
  }
  get get_encuestas_data() {
    return {
      // ultimo: this.ultimo,
      numMostrados: this.numMostrados,
      encuestas: this.encuestas,
    };
  }
  init() {
    const dbPath = path.join(__dirname, "../data/encuestados.xlsx");
    const excel = xlsx.readFile(dbPath);
    const nombreHoja = excel.SheetNames;
    const encuestas = xlsx.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
    this.encuestas = encuestas;
  }
  guardarDB() {
    const dbPathJson = path.join(__dirname, "../data/data.json");
    fs.writeFileSync(dbPathJson, JSON.stringify(this.get_encuestas_data));

    const worksheet = xlsx.utils.json_to_sheet(this.encuestas);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "encuestados");
    const dbPathXlsx = path.join(__dirname, "../data/encuestados.xlsx");
    xlsx.writeFile(workbook, dbPathXlsx);
    console.log("se ejecuto guardarDb");
  }
  agregarEncuesta(encuesta) {
    this.encuestas.unshift(encuesta);
  }
}
module.exports = EncuestaControl;
