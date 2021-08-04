const helpers = {};

helpers.cliente_id = function (value) {
  return value[0].cli_id;
}
helpers.FHA = function () {
  var d = new Date();
  var anio = d.getFullYear();
  var mes = d.getMonth() + 1;
  var dia = d.getDate();
  var hora = d.getHours()
  var minutos = d.getMinutes();
  var fecha = "Hora : " + hora + ":" + minutos + " Fecha: " + anio + "/" + mes + "/" + dia;
  return fecha;

}
helpers.verificador1 = function (value) {
  return value;
}
helpers.lista = function (value) {
  return value[0].rol_nombre;
};
helpers.usuario = function (value) {
  return "\t" + value[0].cli_nombre + "\t" + value[0].cli_apellido;
};
helpers.existe = function (datos, pos) {
  var x = false;
  var modulo = "";
  var aux = 0;
  for (var i = 0; i < datos.length; i++) {
    if (datos[i].mod_id == pos) {
      x = true;
      modulo = datos[i].mod_modulo;
    }
  }
  if (x && pos == 1) {
    var html = '<li class="nav-item">';
    html += '<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapse1"';
    html += 'aria-expanded="true" aria-controls="collapse1">';
    html += '  <i class="fas fa-user-alt"></i>';
    html += " <span>" + modulo + "</span>";
    html += "  </a>";
    html +=
      '<div id="collapse1" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">';
    html += ' <div class="bg-white py-2 collapse-inner rounded">';
    html += '  <a class="collapse-item" href="/cliente">Usuarios</a>';
    html += '<a class="collapse-item" href="/rol">Roles</a>';
    html += '<a class="collapse-item" href="/Modulo">Modulos</a>';

    html += "</div>";
    html += "</div>";
    html += '</li>';
    html += ' <hr class="sidebar-divider">';
  } else if (x && pos == 2) {
    var html = '<li class="nav-item">';
    html += '<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapse2"';
    html += 'aria-expanded="true" aria-controls="collapse2">';
    html += '<i class="fas fa-water"></i>';
    html += " <span>" + modulo + "</span>";
    html += "  </a>";
    html +=
      '<div id="collapse2" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">';
    html += ' <div class="bg-white py-2 collapse-inner rounded">';
    html += '  <a class="collapse-item" href="/CalculosRiego">Activacion Riego</a>';
    html += '  <a class="collapse-item" href="/Formula">Formula</a>';
    html += "</div>";
    html += "</div>";
    html += '</li>';
    html += ' <hr class="sidebar-divider">';
  } else if (x && pos == 3) {
    var html = '<li class="nav-item">';
    html += '<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapse3"';
    html += 'aria-expanded="true" aria-controls="collapse3">';
    html += '  <i class="fas fa-cloud-sun-rain"></i>';
    html += " <span>" + modulo + "</span>";
    html += "  </a>";
    html +=
      '<div id="collapse3" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">';
    html += ' <div class="bg-white py-2 collapse-inner rounded">';
    html += '  <a class="collapse-item" href="/HumedadSuelo">Humedad Suelo</a>';
    html += '  <a class="collapse-item" href="/HumedadRelativa">Humedad Relativa</a>';
    html += '  <a class="collapse-item" href="/Temperatura">Temperatura </a>';
    html += "</div>";
    html += "</div>";
    html += '</li>';
    html += ' <hr class="sidebar-divider">';
  } else if (x && pos == 4) {
    var html = '<li class="nav-item">';
    html += '<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapse4"';
    html += 'aria-expanded="true" aria-controls="collapse4">';
    html += '  <i class="fas fa-feather-alt"></i>';
    html += " <span>" + modulo + "</span>";
    html += "  </a>";
    html +=
      '<div id="collapse4" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">';
    html += ' <div class="bg-white py-2 collapse-inner rounded">';
    html += '  <a class="collapse-item" href="/Formula/Formula_cultivo">Cultivo</a>';
    html += '  <a class="collapse-item" href="/RiegoCultivo">Actualidad Cultivo</a>';
    html += "</div>";
    html += "</div>";
    html += '</li>';
    html += ' <hr class="sidebar-divider">';
  } else if (x && pos == 5) {
    var html = '<li class="nav-item">';
    html += '<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapse5"';
    html += 'aria-expanded="true" aria-controls="collapse5">';
    html += '<i class="fas fa-chart-bar"></i>';
    html += " <span>" + modulo + "</span>";
    html += "  </a>";
    html +=
      '<div id="collapse5" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">';
    html += ' <div class="bg-white py-2 collapse-inner rounded">';
    html += '  <a class="collapse-item" href="/GraficoHR">Volumen de agua cultivo</a>';
    html += '  <a class="collapse-item" href="/GraficoTemperatura">Seguimiento del cultivo</a>';

    html += "</div>";
    html += "</div>";
    html += '</li>';
    html += ' <hr class="sidebar-divider">';
  } else {
    html = "";
  }
  return html;
};

module.exports = helpers;
