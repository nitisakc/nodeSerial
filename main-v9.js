const server = require('express');
const bodyParser = require('body-parser');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

let val = -1;

function readSerial() {
    const port = new SerialPort('/dev/tty.usbserial-11430', { baudRate: 9600 });

    const parser = port.pipe(new Readline({ delimiter: '\r\n' }))

    parser.on('data', (data)=>{
        console.log(data);
        val = data;
    });
}

server()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false}))
    .get('/', (req, res) => res.send(200))
    .get('/getscales', (req, res)=>{
    	res.send((new Date().getTime() + ',' + val));
    })
    .listen(3310, ()=>{
        readSerial();
    });
