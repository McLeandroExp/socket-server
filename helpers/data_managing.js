const xlsx = require("xlsx");
const excelToJson = () => {
  const excel = xlsx.readFile(
    // "C:\\Users\\USER\\Documents\\Cosas de la U\\Infra2\\enemdu_socket_server\\data\\enemdu_persona_2022_11.csv"
    "./data/enemdu_persona_2022_11.csv"
  );
  const nombreHoja = excel.SheetNames;
  const datos = xlsx.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
  //   const primeros10 = datos.filter((v, i) => i < 10);
  const numEncuestados = 10;
  const encuestados = [];
  for (let i = 0; i < numEncuestados; i++) {
    encuestados.push(datos[i]);
  }
  const usuarios = encuestados.map(
    ({ p02, p24, p29, p44a, p44d, p44g, p47b, p49, p51a, ingrl }, i) => {
      if (i < numEncuestados) {
        return {
          sexo: p02 === 1 ? "hombre" : "mujer",
          horas_trabajo_semana_anterior: p24,
          horas_semana_disponible_para_trabajar: p29,
          recibe_alimentacion: p44a === 1 ? "si" : "no",
          recibe_vacaciones: p44d === 1 ? "si" : "no",
          recibe_seguro_medico: p44g === 1 ? "si" : "no",
          numero_trabajadores: p47b,
          establecimiento_tiene_ruc: p49 === 1 ? "si" : "no",
          horas_trabajo: p51a,
          ingreso_laboral: ingrl,
        };
      }
    }
  );
  const worksheet = xlsx.utils.json_to_sheet(usuarios);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "encuestados");
  xlsx.writeFile(workbook, "data/encuestados.xlsx");
};
excelToJson();
module.exports = excelToJson;
