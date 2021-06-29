/*
const socket = io();
const temImagTemperatura=document.getElementById('ImagenTemperatura');
const temlabTemperatura=document.getElementById('medida');
const tarjeta1=document.getElementById('car1');
var val_temperatura = 0;
var val_humedad_s = 0;
var val_humedad = 0;





socket.on("temp", (data) => {
  let temperatura = document.getElementById("temp1");
  let humedad = document.getElementById("temp2");
  let humedad_s = document.getElementById("temp3");

  var aux = data.split(",");
  val_temperatura = aux[0];
  val_humedad = aux[1];
  val_humedad_s = Math.round((aux[2] * 100) / 1023);

  temperatura.innerHTML = `${val_temperatura} °C`;
  humedad.innerHTML = `${val_humedad} %`;
  humedad_s.innerHTML = `${val_humedad_s} %`;
  updateImageTemperatura(val_temperatura);
});


function updateImageTemperatura(valor){
let src='/imagenes/temp-mid.png';
if(valor>26){
  src='/imagenes/temp-high.png';
  temlabTemperatura.innerHTML="Temperatura Alta";
 
}else if(valor<20){
  src='/imagenes/temp-low.png';
  temlabTemperatura.innerHTML="Temperatura Media";
}
temImagTemperatura.src=src;

}
*/

/*
//Codigo de tablas con grasficos
google.charts.load('current', { 'packages': ['gauge'] });
google.charts.setOnLoadCallback(drawChart);
var options_temperatura = {
  min: 0, max: 50,
  width: 200, height: 100,
  redFrom: 90, redTo: 100,
  yellowFrom: 55, yellowTo: 80,
  minorTicks: 5
};

var data;
var chart;
function drawChart() {


  data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Temperatura', 0]
  ]);
  chart = new google.visualization.Gauge(document.getElementById('chart_div'));
  chart.draw(data, options_temperatura);



  setInterval(function() {
    data.setValue(0, 1, val_temperatura);
    chart.draw(data, options_temperatura);
  }, 100);


}
*/

