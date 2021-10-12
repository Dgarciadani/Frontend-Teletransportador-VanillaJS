let fechaActual = new Date();
let todasMaterias = [
  {
    materia: "Testing I",
    link: "https://digitalhouse.zoom.us/j/9281135498?pwd=UGVOU0c3cFlZNmJqcjFkLzJzTHdJdz09&_x_zm_rtaid=tRl-CK4KSE-sqBqcX6vIOg.1633451980617.752fcec814c8d19fef1e07a542edae9e&_x_zm_rhtaid=806#success",
    pass: "aulasDH.52",
    dias: [2, 4, 5],
    horarios: [2, 2, 3],
  },
  {
    materia: "ProOrObj",
    link: "https://digitalhouse.zoom.us/j/4169064164?pwd=L1Q0aFdaSDZ0R25SVG1lc2NMTk1iQT09&_x_zm_rtaid=KIo-9r58SV-Yl1qIiXfYMA.1633368962722.3e8edb4307d68c53277f9c1047d2db6a&_x_zm_rhtaid=874#success",
    pass: "aulasDH.40",
    dias: [1, 2, 5],
    horarios: [2, 3, 2],
  },
  {
    materia: "Infra I",
    link: "https://digitalhouse.zoom.us/j/4613961104?pwd=aulasDH.36&_x_zm_rtaid=0Y2NnCPBT4C4XSA2KhI6qw.1634044292850.5121a86df9e18588fbf11637d575447e&_x_zm_rhtaid=391#success",
    pass: "aulasDH.36",
    dias: [1, 3, 4],
    horarios: [1, 1, 1],
  },
  {
    materia: "Front II",
    link: "https://digitalhouse.zoom.us/j/8194296021?pwd=ak1MNFIrY3lBMVFWZVAxTE1keHU4dz09&_x_zm_rtaid=KIo-9r58SV-Yl1qIiXfYMA.1633368962722.3e8edb4307d68c53277f9c1047d2db6a&_x_zm_rhtaid=874#success",
    pass: "aulasDH.21",
    dias: [1, 3, 4],
    horarios: [3, 3, 3],
  },
  {
    materia: "Desing Th",
    link: "https://digitalhouse.zoom.us/j/4613961104?pwd=aulasDH.23&_x_zm_rtaid=0Y2NnCPBT4C4XSA2KhI6qw.1634044292850.5121a86df9e18588fbf11637d575447e&_x_zm_rhtaid=391#success",
    pass: "aulasDH.23",
    dias: [3],
    horarios: [2],
  },
];

const totalClasesHoy = document.querySelector(".clasesHoy");
const proximaClase = document.querySelector(".proximaClase");
const tituloH1 = document.querySelector("h1");

buscarCursos = {
  clases: todasMaterias,
  hoy: fechaActual.getDay(),
  hora: fechaActual.getHours(),
  horaminuto: fechaActual.getHours() + fechaActual.getMinutes() / 100,
  minuto: fechaActual.getMinutes(),
  turnoAHora: function (turno) {
    if (turno == 1) {
      return "11:00 a 13:00";
    } else if (turno == 2) {
      return "13:30 a 15:30";
    } else if (turno == 3) {
      return "16:00 a 18:00";
    }
  },
  hoyClases: function () {
    let clasesHoy = this.clases.filter(
      (clases) => clases.dias.filter((dias) => dias == this.hoy) == this.hoy
    );
    return clasesHoy.sort(
      (a, b) =>
        a.horarios[a.dias.indexOf(this.hoy)] - b.horarios[b.dias.indexOf(this.hoy)]
    );
  },
  siguienteClase: function () {
    if (this.horaminuto <= 13 && this.hoyClases()[0].horarios[0] == 1) {
      console.log("entro en 1no");
      return this.hoyClases().filter(
        (turno) => turno.horarios[turno.dias.indexOf(this.hoy)] === 1
      );
    } else if (this.horaminuto <= 15.3 && this.horaminuto >= 13.01) {
      console.log("entro en 2");
      return this.hoyClases().filter(
        (turno) => turno.horarios[turno.dias.indexOf(this.hoy)] === 2
      );
    } else if (this.horaminuto <= 18.0 && this.horaminuto >= 15.31) {
      console.log("Entro en 3ro");
      return this.hoyClases().filter(
        (turno) => turno.horarios[turno.dias.indexOf(this.hoy)] === 3
      );
    } else if (this.horaminuto > 18.0 && this.hoy < 6) {
      return "No hay mas clases por hoy campeon";
    } else if (this.horaminuto > 18.0 && this.hoy >= 6) {
      return "A disfrutar ese finde, la facu se recursa, la vida no!";
    } else {
      return this.hoyClases().filter(
        (turno) => turno.horarios[turno.dias.indexOf(this.hoy)] === 2
      );
    }
  },
};
/* console.table(buscarCursos.hoyClases(buscarCursos.hoy));
console.log(buscarCursos.horaminuto);
console.table(buscarCursos.siguienteClase()); */
function imprimirProximaClase() {
  if (typeof buscarCursos.siguienteClase() == typeof "string" && buscarCursos.hoy <= 6) {
    proximaClase.innerHTML += `<p>${buscarCursos.siguienteClase()}🤘</p>`;
  } else {
    buscarCursos.siguienteClase().forEach((clase) => {
      proximaClase.innerHTML += `
              <div class="caja">
              <h3 class="materiaName">${clase.materia}</h2>
              <p class="materiaHorario"> de ${buscarCursos.turnoAHora(
                clase.horarios[clase.dias.indexOf(buscarCursos.hoy)]
              )}</p>
              <a href="${
                clase.link
              }" target="_blank"> <button>Link a la clase</button></a>
              </div>`;

      console.log("PC");
    });
  }
}
imprimirProximaClase();

function imprimirClasesHoy() {
  buscarCursos.hoyClases().forEach((clase) => {
    totalClasesHoy.innerHTML += `
                  <div class="caja">
                  <h3 class="materiaName">${clase.materia}</h2>
                  <p class="materiaHorario"> de ${buscarCursos.turnoAHora(
                    clase.horarios[clase.dias.indexOf(buscarCursos.hoy)]
                  )}</p>
                  <a href="${
                    clase.link
                  }" target="_blank"> <button>Link a la clase</button></a>
                  </div>`;

    console.log("CH");
  });
}
imprimirClasesHoy();
