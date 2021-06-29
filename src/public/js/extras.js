

function campoVacio(campo, valor,mensaje) {
  document.getElementById(valor).innerHTML =" ";
  if (campo.length != 0) {
    document.getElementById(valor).innerHTML =
    '<small style="color:#008f39">listo</small>';
    return true;
  } else {
    document.getElementById(valor).innerHTML =
      '<small style="color:#FF0000">'+mensaje+'</small>';
    return false;
  }
}

function validarNumeros(numero, valor,mensaje) {
  document.getElementById(valor).innerHTML ="";
  var regex_numeros = /^\d{7,10}$/;
  if (regex_numeros.exec(numero)) {
    document.getElementById(valor).innerHTML =
    '<small style="color:#008f39">listo</small>';
    return true;
  } else {
    document.getElementById(valor).innerHTML +=
    '<small style="color:#FF0000">'+mensaje+'</small>';
    return false;
  }
}

function validarN(numero, valor,mensaje) {
  document.getElementById(valor).innerHTML ="";
  var regex_numeros = /^\d{1,2}$/;
  if (regex_numeros.exec(numero)) {
    document.getElementById(valor).innerHTML =
    '<small style="color:#008f39">listo</small>';
    return true;
  } else {
    document.getElementById(valor).innerHTML +=
    '<small style="color:#FF0000">'+mensaje+'</small>';
    return false;
  }
}

function validarLetra(letra, valor,mensaje) {
  var regex_letras = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
  document.getElementById(valor).innerHTML =" ";
  if (regex_letras.exec(letra)) {
    document.getElementById(valor).innerHTML =
    '<small style="color:#008f39">listo</small>';
    return true;
  } else {
    document.getElementById(valor).innerHTML =
    '<small style="color:#FF0000">'+mensaje+'</small>';
    return false;
  }
}
function validarCedulaEcuador(cedula,valor) {
  document.getElementById(valor).innerHTML =" ";
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
  } else{
    document.getElementById(valor).innerHTML =
    '<small style="color:#FF0000">El valor ingresado debe tener 10 digitos</small>';
  return false;
  }
}

function validarCorreo(correo) {
  var regex_correo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  document.getElementById("grupo_correo").innerHTML =" ";
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


function validarCbx(valor,grupo) {
  document.getElementById(grupo).innerHTML =" ";
  if (valor!=0) {
    document.getElementById(grupo).innerHTML =
      '<small style="color:#008f39">listo</small>';
    return true;
  } else {
    document.getElementById(grupo).innerHTML +=
      '<br><small style="color:#FF0000">Seleccion el rol correcto.</small>';
    return false;
  }
}


function fechaActual(){
    var d = new Date();
    var anio=d.getFullYear();
    var mes=d.getMonth()+1;
    var dia=d.getDate();
    var fecha=anio+"-"+mes+"-"+dia;
    return fecha;

}

function HoraActual(){
  var fecha = new Date();
  var hora=fecha.getMilliseconds();
  return hora;
}
