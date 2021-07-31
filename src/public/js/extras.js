

function campoVacio(campo, valor, mensaje) {
  document.getElementById(valor).innerHTML = " ";
  if (campo.length != 0) {
    document.getElementById(valor).innerHTML =
      '<small style="color:#008f39">listo</small>';
    return true;
  } else {
    document.getElementById(valor).innerHTML =
      '<small style="color:#FF0000">' + mensaje + '</small>';
    return false;
  }
}

function validarNumeros(numero, valor, mensaje) {
  document.getElementById(valor).innerHTML = "";
  var regex_numeros = /^\d{7,10}$/;
  if (regex_numeros.exec(numero)) {
    document.getElementById(valor).innerHTML =
      '<small style="color:#008f39">listo</small>';
    return true;
  } else {
    document.getElementById(valor).innerHTML +=
      '<small style="color:#FF0000">' + mensaje + '</small>';
    return false;
  }
}

function validarN(numero, valor, mensaje) {
  document.getElementById(valor).innerHTML = "";
  var regex_numeros = /^\d{1,2}$/;
  if (regex_numeros.exec(numero)) {
    document.getElementById(valor).innerHTML =
      '<small style="color:#008f39">listo</small>';
    return true;
  } else {
    document.getElementById(valor).innerHTML +=
      '<small style="color:#FF0000">' + mensaje + '</small>';
    return false;
  }
}

function validarLetra(letra, valor, mensaje) {
  var regex_letras = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
  document.getElementById(valor).innerHTML = " ";
  if (regex_letras.exec(letra)) {
    document.getElementById(valor).innerHTML =
      '<small style="color:#008f39">listo</small>';
    return true;
  } else {
    document.getElementById(valor).innerHTML =
      '<small style="color:#FF0000">' + mensaje + '</small>';
    return false;
  }
}
function validarCedulaEcuador(cedula, valor) {
  document.getElementById(valor).innerHTML = " ";
  var cad = cedula.trim();
  var total = 0;
  var longitud = cad.length;
  var longcheck = longitud - 1;

  if (cad !== "" && longitud === 10) {
    for (i = 0; i < longcheck; i++) {
      if (i % 2 === 0) {
        var aux = cad.charAt(i) * 2;
        if (aux > 9) aux -= 9;
        total += aux;
      } else {
        total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
      }
    }

    total = total % 10 ? 10 - (total % 10) : 0;

    if (cad.charAt(longitud - 1) == total) {
      document.getElementById(valor).innerHTML =
        '<small style="color:#008f39">listo</small>';
      return true;
    } else {
      document.getElementById(valor).innerHTML =
        '<small style="color:#FF0000">Cedula incorrecta</small>';
      return false;
    }
  } else {
    document.getElementById(valor).innerHTML =
      '<small style="color:#FF0000">El valor ingresado debe tener 10 digitos</small>';
    return false;
  }
}

function validarCorreo(correo) {
  var regex_correo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  document.getElementById("grupo_correo").innerHTML = " ";
  if (regex_correo.exec(correo)) {
    document.getElementById("grupo_correo").innerHTML =
      '<small style="color:#008f39">listo</small>';
    return true;
  } else {
    document.getElementById("grupo_correo").innerHTML +=
      '<br><small style="color:#FF0000">Correo Incorrecto.</small>';
    return false;
  }
}


function validarCbx(valor, grupo) {
  document.getElementById(grupo).innerHTML = " ";
  if (valor != 0) {
    document.getElementById(grupo).innerHTML =
      '<small style="color:#008f39">listo</small>';
    return true;
  } else {
    document.getElementById(grupo).innerHTML +=
      '<br><small style="color:#FF0000">Seleccion el rol correcto.</small>';
    return false;
  }
}

function validarCbx1(valor, grupo, mensaje) {
  document.getElementById(grupo).innerHTML = " ";
  if (valor != 0) {
    document.getElementById(grupo).innerHTML =
      '<small style="color:#008f39">listo</small>';
    return true;
  } else {
    document.getElementById(grupo).innerHTML +=
      '<br><small style="color:#FF0000">' + mensaje + '</small>';
    return false;
  }
}


function fechaActual() {
  var d = new Date();
  var anio = d.getFullYear();
  var mes = d.getMonth() + 1;
  var dia = d.getDate();
  var fecha = anio + "-" + mes + "-" + dia;
  return fecha;

}

function HoraActual() {
  var fecha = new Date();
  var hora = fecha.getMilliseconds();
  return hora;
}

var arreglo = [{ "id": 0 }]

//Calculo ECUACIÓN DE PENMAN-MONTEITH

//Velocidad del viento 
function EcuacionPenmanMonteith(u2, y, pcv, es, ea, Rn, Tpromedio, G) {
  let num1 = (0.408) * parseFloat(pcv) * (parseFloat(Rn) - parseFloat(G));
  let num2 = y * (900 / (parseFloat(Tpromedio) + 273)) * parseFloat(u2) * (parseFloat(es) - parseFloat(ea));
  let den = parseFloat(pcv) + (parseFloat(y) * (1 + (0.34 * parseFloat(u2))));

  let ETo = (num1 + num2) / den;
  return ETo.toFixed(4);

}



function velocidadViento(velocidad, altura) {
  let v2 = velocidad * (4.87 / Math.log((67.82 * altura) - 5.42));
  return v2.toFixed(4);
}

function RadiacionExtraterrestre(latitudx, mes) {
  let a = latitudx.split(".");
  let x2 = parseInt(a[0]);
  let x1 = parseInt(a[0]) + 2;
  let y2 = arrRadiacionExtraterrestre[x2][mes - 1];
  let y1 = arrRadiacionExtraterrestre[x1][mes - 1];
  let Ra = y1 - (x1 - latitudx) * ((y2 - y1) / (x2 - x1));
  return Ra.toFixed(4);

}

function InsolacionMaximaDiaria(latitudx, mes) {
  let a = latitudx.split(".");
  let x2 = parseInt(a[0]);
  let x1 = parseInt(a[0]) + 2;
  let y2 = arrInsolacion[x2][mes - 1];
  let y1 = arrInsolacion[x1][mes - 1];
  let N = y1 - (x1 - latitudx) * ((y2 - y1) / (x2 - x1));
  return N.toFixed(4);

}
function constantepsicometric(msnm) {
  let y = 0.665 * Math.pow(10, -3) * presion(msnm);
  return y.toFixed(4);
}

function duracionInsolacion(N, porcentaje) {

  let n = (parseFloat(N) * parseFloat(porcentaje)) / 100;
  return n.toFixed(4);

}

function radiacionSolarEntrante(N, n, Ra) {
  let Rs = (0.25 + (0.5 * (n / N))) * Ra;
  return Rs.toFixed(4);

}
function T_K4(Tem) {
  const land = 4.903 * Math.pow(10, -9);
  let temp = parseFloat(Tem) + 273.16;
  let T_k4_var = land * Math.pow(temp, 4)
  return T_k4_var.toFixed(4)

}
function radiacionSolarDespejado(Ra, msnm) {
  let Rso = (0.75 + ((2 * msnm) / 100000)) * Ra;
  return Rso.toFixed(4);

}

function radiacionNetaCorta(Rs) {
  let Rns = 0.77 * Rs;
  return Rns.toFixed(4);
}

function radiacionnetalarga(Tmax, Tmin, ea, Ra, msnm, N, n) {

  let TmaxK4 = parseFloat(T_K4(Tmax));
  let TminK4 = parseFloat(T_K4(Tmin));
  let Rso = radiacionSolarDespejado(Ra, msnm);
  let Rs = radiacionSolarEntrante(N, n, Ra);
  let raiz = Math.sqrt(ea);
  let parte1 = ((TmaxK4 + TminK4) / 2);
  let parte2 = (0.34 - (0.14 * raiz));
  let parte3 = ((1.35 * (Rs / Rso)) - 0.35);
  let Rnl = parte1 * parte2 * parte3;
  return Rnl.toFixed(4);

}

function radiacionNeta(Tmax, Tmin, ea, Ra, msnm, N, n) {
  let Rs = radiacionSolarEntrante(N, n, Ra);
  let Rnl = radiacionnetalarga(Tmax, Tmin, ea, Ra, msnm, N, n);
  let Rns = radiacionNetaCorta(Rs);
  let Rn = Rns - Rnl;
  return Rn.toFixed(4);

}

function pendienteCurvaPresionVapor(Tpromedio) {

  let den = (parseInt(Tpromedio) + 237.3);
  let exp = ((17.27 * parseInt(Tpromedio)) / den)
  let num = 4098 * (0.6108 * Math.pow(2.7183, exp));
  let pcv = num / Math.pow(den, 2);

  return pcv.toFixed(4);

}

function presionVaporSaturacion(Tmax, Tmin) {
  let eTmax = eValorT(Tmax);
  let eTmin = eValorT(Tmin);
  let es = (parseFloat(eTmax) + parseFloat(eTmin)) / 2;
  return es.toFixed(4);
}

function presionRealVapor(HRpromedio, es) {
  let ea = (HRpromedio / 100) * es;
  return ea.toFixed(4);

}



function presion(msnm) {
  let tem = (293 - (0.0065 * msnm)) / 293;
  let p = 101.3 * Math.pow(tem, 5.26);
  return p.toFixed(4);

}

function eValorT(Temperatura) {
  let den = (parseInt(Temperatura) + 237.3);
  let exp = ((17.27 * parseInt(Temperatura)) / den)
  let eTpvs = 0.6108 * Math.pow(2.7183, exp);
  return eTpvs.toFixed(4);
}



////////Tabla de Calculos

var arrRadiacionExtraterrestre = [
  [36.2, 37.5, 37.9, 36.8, 34.8, 33.4, 33.9, 35.7, 37.2, 37.4, 36.3, 35.6],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [36.9, 37.9, 38.0, 36.4, 34.1, 32.6, 33.1, 35.2, 37.1, 37.7, 37.0, 36.4],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [37.6, 38.3, 38.0, 36.0, 33.4, 31.8, 32.3, 34.6, 37.0, 38.0, 37.6, 37.2],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [38.3, 38.7, 38.0, 35.6, 32.7, 30.9, 31.5, 34.0, 36.8, 38.2, 38.2, 38.0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [38.9, 39.0, 37.9, 35.1, 31.9, 30.0, 30.7, 33.4, 36.6, 38.4, 38.8, 38.7],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [39.5, 39.3, 37.8, 34.6, 31.1, 29.1, 29.8, 32.8, 36.3, 38.5, 39.3, 39.4],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [40.1, 39.6, 37.7, 34.0, 30.2, 28.1, 28.9, 32.1, 36.0, 38.6, 39.8, 40.0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [40.6, 39.7, 37.5, 33.4, 29.4, 27.2, 27.9, 31.3, 35.6, 38.7, 40.2, 40.6],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [41.1, 39.9, 37.2, 32.8, 28.5, 26.2, 27.0, 30.6, 35.2, 38.7, 40.6, 41.2]
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [41.5, 40.0, 37.0, 32.1, 27.5, 25.1, 26.0, 29.8, 34.7, 38.7, 40.9, 41.7],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [41.9, 40.0, 36.6, 31.3, 26.6, 24.1, 25.0, 28.9, 34.2, 38.6, 41.2, 42.1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [42.2, 40.1, 36.2, 30.6, 25.6, 23.0, 24.0, 28.1, 33.7, 38.4, 41.4, 42.6],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [42.5, 40.0, 35.8, 29.8, 24.6, 21.9, 22.9, 27.2, 33.1, 38.3, 41.7, 43.0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [42.8, 39.9, 35.3, 29.0, 23.5, 20.8, 21.8, 26.3, 32.5, 38.0, 41.8, 43.3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [43.0, 39.8, 34.8, 28.1, 22.5, 19.7, 20.7, 25.3, 31.8, 37.8, 41.9, 43.6],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [43.1, 39.6, 34.3, 27.2, 21.4, 18.5, 19.6, 24.3, 31.1, 37.5, 42.0, 43.9],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [43.3, 39.4, 33.7, 26.3, 20.3, 17.4, 18.5, 23.3, 30.4, 37.1, 42.0, 44.1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [43.4, 39.2, 33.0, 25.3, 19.2, 16.2, 17.4, 22.3, 29.6, 36.7, 42.0, 44.3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [43.4, 38.9, 32.4, 24.3, 18.1, 15.1, 16.2, 21.2, 28.8, 36.3, 42.0, 44.4],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [43.4, 38.5, 31.7, 23.3, 16.9, 13.9, 15.1, 20.2, 28.0, 35.8, 41.9, 44.5],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [43.4, 38.1, 30.9, 22.3, 15.8, 12.8, 13.9, 19.1, 27.1, 35.3, 41.8, 44.6],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [43.3, 37.7, 30.1, 21.2, 14.6, 11.6, 12.8, 18.0, 26.2, 34.7, 41.6, 44.6],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [43.2, 37.2, 29.3, 20.1, 13.5, 10.5, 11.6, 16.8, 25.2, 34.1, 41.4, 44.6],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [43.0, 36.7, 28.4, 19.0, 12.3, 9.3, 10.4, 15.7, 24.3, 33.5, 41.1, 44.6],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [42.9, 36.2, 27.5, 17.9, 11.1, 8.2, 9.3, 14.6, 23.3, 32.8, 40.9, 44.5],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [42.7, 35.6, 26.6, 16.7, 10.0, 7.1, 8.2, 13.4, 22.2, 32.1, 40.6, 44.5],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [42.5, 35.0, 25.6, 15.6, 8.8, 6.0, 7.1, 12.2, 21.2, 31.4, 40.2, 44.4],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [42.2, 34.3, 24.6, 14.4, 7.7, 4.9, 6.0, 11.1, 20.1, 30.6, 39.9, 44.3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [42.0, 33.7, 23.6, 13.2, 6.6, 3.9, 4.9, 9.9, 19.0, 29.8, 39.5, 44.1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [41.7, 33.0, 22.6, 12.0, 5.5, 2.9, 3.9, 8.7, 17.9, 28.9, 39.1, 44.0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [41.5, 32.3, 21.5, 10.8, 4.4, 2.0, 2.9, 7.6, 16.7, 28.1, 38.7, 43.9],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [41.2, 31.5, 20.4, 9.6, 3.4, 1.2, 2.0, 6.4, 15.5, 27.2, 38.3, 43.9],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [41.0, 30.8, 19.3, 8.4, 2.4, 0.6, 1.2, 5.3, 14.4, 26.3, 38.0, 43.9],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [40.9, 30.0, 18.1, 7.2, 1.5, 0.1, 0.5, 4.2, 13.1, 25.4, 37.6, 44.1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [41.0, 29.3, 16.9, 6.0, 0.8, 0.0, 0.0, 3.2, 11.9, 24.4, 37.4, 44.7],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [41.4, 28.6, 15.8, 4.9, 0.2, 0.0, 0.0, 2.2, 10.7, 23.5, 37.3, 45.3]
]

var arrInsolacion = [
  [12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [12.1, 12.1, 12.0, 12.0, 11.9, 11.9, 11.9, 11.9, 12.0, 12.0, 12.1, 12.1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [12.2, 12.1, 12.0, 11.9, 11.8, 11.8, 11.8, 11.9, 12.0, 12.1, 12.2, 12.2],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [12.3, 12.2, 12.0, 11.9, 11.7, 11.7, 11.7, 11.8, 12.0, 12.1, 12.3, 12.3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [12.4, 12.3, 12.1, 11.8, 11.6, 11.5, 11.6, 11.7, 12.0, 12.2, 12.4, 12.5],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [12.5, 12.3, 12.1, 11.8, 11.5, 11.4, 11.5, 11.7, 11.9, 12.2, 12.5, 12.6],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [12.6, 12.4, 12.1, 11, 7, 11.4, 11.3, 11.4, 11.6, 11.9, 12.3, 12.6, 12.7],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [12.7, 12.4, 12.1, 11.7, 11.4, 11.2, 11.2, 11.5, 11.9, 12.3, 12.7, 12.8],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [12.9, 12.5, 12.1, 11.6, 11.3, 11.1, 11.1, 11.5, 11.9, 12.4, 12.8, 12.9],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [13.0, 12.6, 12.1, 11.6, 11.2, 10.9, 11.0, 11.4, 11.9, 12.4, 12.9, 13.1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [13.1, 12.7, 12.1, 11.5, 11.1, 10.8, 10.9, 11.3, 11.9, 12.5, 13.0, 13.2],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [13.2, 12.7, 12.1, 11.5, 10.9, 10.7, 10.8, 11.2, 11.9, 12.5, 13.1, 13.3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [13.3, 12.8, 12.2, 11.4, 10.8, 10.5, 10.7, 11.2, 11.9, 12.6, 13.2, 13.5],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [13.5, 12.9, 12.2, 11.4, 10.7, 10.4, 10.5, 11.1, 11.9, 12.6, 13.3, 13.6],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [13.6, 13.0, 12.2, 11.3, 10.6, 10.2, 10.4, 11.0, 11.8, 12.7, 13.4, 13.8],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [13.7, 13.0, 12.2, 11.3, 10.5, 10.1, 10.2, 10.9, 11.8, 12.7, 13.5, 13.9],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [13.9, 13.1, 12.2, 11.2, 10.4, 9.9, 10.1, 10.8, 11.8, 12.8, 13.7, 14.1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [14.0, 13.2, 12.2, 11.1, 10.2, 9.7, 9.9, 10.7, 11.8, 12.9, 13.8, 14.3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [14.2, 13.3, 12.3, 11.1, 10.1, 9.6, 9.8, 10.6, 11.8, 12.9, 13.9, 14.4],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [14.4, 13.4, 12.3, 11.0, 9.9, 9.4, 9.6, 10.5, 11.8, 13.0, 14.1, 14.6],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [14.5, 13.5, 12.3, 10.9, 9.8, 9.2, 9.4, 10.4, 11.8, 13.1, 14.3, 14.8],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [14.7, 13.6, 12.3, 10.8, 9.6, 9.0, 9.2, 10.3, 11.7, 13.2, 14.4, 15.0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [14.9, 13.7, 12.4, 10.8, 9.4, 8.7, 9.0, 10.2, 11.7, 13.3, 14.6, 15.3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [15.2, 13.9, 12.4, 10.7, 9.2, 8.5, 8.8, 10.0, 11.7, 13.3, 14.8, 15.5],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [15.4, 14.0, 12.4, 10.6, 9.0, 8.2, 8.5, 9.9, 11.7, 13.4, 15.0, 15.8],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [15.7, 14.2, 12.4, 10.5, 8.8, 7.9, 8.3, 9.7, 11.7, 13.6, 15.3, 16.1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [16.0, 14.3, 12.5, 10.4, 8.6, 7.5, 8.0, 9.6, 11.6, 13.7, 15.5, 16.5],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [16.3, 14.5, 12.5, 10.2, 8.3, 7.2, 7.6, 9.4, 11.6, 13.8, 15.8, 16.9],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [16.7, 14.7, 12.5, 10.1, 8.0, 6.7, 7.2, 9.2, 11.6, 13.9, 16.1, 17.3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [17.1, 14.9, 12.6, 9.9, 7.6, 6.2, 6.8, 8.9, 11.5, 14.1, 16.5, 17.8],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [17.6, 15.2, 12.6, 9.8, 7.2, 5.6, 6.3, 8.7, 11.5, 14.3, 16.9, 18.4],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [18.3, 15.5, 12.7, 9.6, 6.7, 4.8, 5.6, 8.3, 11.4, 14.5, 17.4, 19.2],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [19.0, 15.8, 12.8, 9.3, 6.1, 3.7, 4.8, 8.0, 11.4, 14.7, 18.0, 20.3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [20.1, 16.2, 12.8, 9.1, 5.3, 2.0, 3.7, 7.6, 11.3, 15.0, 18.8, 22.1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [21.9, 16.7, 12.9, 8.7, 4.3, 0.0, 1, 7, 7.0, 11.3, 15.3, 19.9, 24.0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [24.0, 17.4, 13.0, 8.4, 2.7, 0.0, 0.0, 6.4, 11.2, 15.7, 21.7, 24.0]
]

