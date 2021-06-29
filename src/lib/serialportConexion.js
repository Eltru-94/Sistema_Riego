
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

var parser;
var puerto = "";
var io = null;
var port=null;



const SerialConexion = {};

SerialConexion.conexion = function (puerto) {
    port = new SerialPort(puerto, {
        baudRate: 9600,
    });
    
    parser = port.pipe(new Readline({ delimiter: "\r\n" }));
   
    parser.on("open", function () {
        console.log("Puerto abierto");
    });
    parser.on("data", function (data) {
        console.log(data);
        io.emit("temp", data);
    });

}

SerialConexion.getio =  function (aux) {
    
    io= aux;
}
SerialConexion.close=function (valor) {
   //const temImagTemperatura=document.getElementById('ImagenTemperatura');
    console.log(valor)
}

 SerialConexion.escribir=function (valor) {
   port.write(valor);
 }

SerialConexion.conexion1=function(){

    io.on('connection',(socket)=>{
        socket.on('data',(data)=>{
          console.log("Mensaje recibido : "+ data)
        })
        socket.on('close',()=>{
          console.log("comunicacion finalizada")
        })
        socket.on('error',(err)=>{
          console.log(err.mensage)
        })
      })
}


module.exports = SerialConexion;