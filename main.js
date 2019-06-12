const server = require('express');
const bodyParser = require('body-parser');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const pjson = require('./package.json');

let val = -1;

function runSerial() {
	SerialPort.list(function(err, ports) {
		console.dir(ports);
		let allports = ports.length;
		let count = 0;
		let done = false;
		let arduinoport = pjson.args.serialport;
		ports.forEach(function(port) {
			count += 1;
			pm = port['manufacturer'];
			// if (typeof pm !== 'undefined' && pm.includes('arduino') && !done) {
			if (typeof port['productId'] !== 'undefined' && port['productId'] == '7523' && !done) {
				arduinoport = port.comName.toString();
				done = true;
			}
			if (count === allports && done === false) { console.log('Cant find arduino. Use default'); }
		});

		console.log(`Connect ${arduinoport} port`);
		const port = new SerialPort(arduinoport, { baudRate: pjson.args.baudRate });
		const lineStream = port.pipe(new Readline());

		lineStream.on('data', function (data) {
			console.log(data.toString());
			let input = data.toString();

			let i = input.indexOf("k");
			val = (typeof val == 'number' ? (parseFloat(input.substring(i+3,i+9)) / 10) : -1);
		});
	});
}

server()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false}))
    .get('/', (req, res) => res.send(200))
    .get('/getscales', (req, res)=>{
    	res.send((new Date().getTime() + ',' +val));
    })
    .listen(pjson.args.port, ()=>{
    	console.log(`Listening on ${ pjson.args.port }`);
    	console.log(`Check status on http://localhost:${pjson.args.port}/`);
    	console.log(`Get values on http://localhost:${pjson.args.port}/getscales`);
    	runSerial();
    });


		
