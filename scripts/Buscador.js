let fechaActual = new Date();
let todasMaterias = [
  {
    materia: "Infra II",
    link: "https://digitalhouse.zoom.us/j/9386966775?pwd=UGRySTJsU0g5cTRXM3V4QzFoU204QT09&_x_zm_rtaid=i0T-U5zzTdGRLrVRxdKx4Q.1646229614724.271e29cee69d45025f294d8a8ff0894a&_x_zm_rhtaid=635#",
    pass: "aulasDH.52",
    dias: [1, 3, 5],
    horarios: [1, 1, 1],
  },
  {
    materia: "Backend I",
    link: "https://digitalhouse.zoom.us/j/4260292371?pwd=QnEvaTFIZm5peVRLT2F5VFQ4SzZIQT09&_x_zm_rtaid=_uQ0EQiHT7miAwvcC_jsFQ.1646238671217.feabd5c963f08b38c3aab794807fc3f2&_x_zm_rhtaid=746#",
    pass: "aulasDH.40",
    dias: [1, 2, 2, 3, 4, 4],
    horarios: [2, 1, 2, 2, 2, 3],
  },
  {
    materia: "Frontend III",
    link: "https://digitalhouse.zoom.us/j/6434543399?pwd=RWdYMENtNXhPZVJIZk9ZWm00WERUUT09&_x_zm_rtaid=mryh6gcsRF2IJ1a-MY-Z5g.1646254871439.714e324fc2c11d3c59232701cc1508c7&_x_zm_rhtaid=134#",
    pass: "aulasDH.36",
    dias: [1, 3, 4],
    horarios: [4, 4, 4],
  },
  /* {
    materia: "Front II",
    link: "https://digitalhouse.zoom.us/j/8194296021?pwd=ak1MNFIrY3lBMVFWZVAxTE1keHU4dz09&_x_zm_rtaid=KIo-9r58SV-Yl1qIiXfYMA.1633368962722.3e8edb4307d68c53277f9c1047d2db6a&_x_zm_rhtaid=874#",
    pass: "aulasDH.21",
    dias: [1, 3, 4],
    horarios: [3, 3, 3],
  },
  {
    materia: "Desing Th",
    link: "https://digitalhouse.zoom.us/j/4613961104?pwd=aulasDH.23&_x_zm_rtaid=0Y2NnCPBT4C4XSA2KhI6qw.1634044292850.5121a86df9e18588fbf11637d575447e&_x_zm_rhtaid=391#",
    pass: "aulasDH.23",
    dias: [3],
    horarios: [2],
  }, */
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
    } else if (turno == 4) {
      return "18:00 a 20:00";
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
    } else if (this.horaminuto <= 17.0 && this.horaminuto >= 15.31) {
      console.log("Entro en 3ro");
      return this.hoyClases().filter(
        (turno) => turno.horarios[turno.dias.indexOf(this.hoy)] === 3
      );
    } else if (this.horaminuto <= 20.0 && this.horaminuto >= 17.5) {
      console.log("Entro en 3ro");
      return this.hoyClases().filter(
        (turno) => turno.horarios[turno.dias.indexOf(this.hoy)] === 4
      );
    } else if (this.horaminuto > 20.0 && this.hoy < 6) {
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
              <a target="_blank" href="${
                clase.link
              }"> <button>Link a la clase</button></a>
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
                  <a target="_blank" href="${
                    clase.link
                  }"> <button>Link a la clase</button></a>
                  </div>`;

    console.log("CH");
  });
}
imprimirClasesHoy();
