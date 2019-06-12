Installing
- Install CH341SER.EXE
- Download and install NodeJS version >= 8.0.0 https://nodejs.org/dist/v10.16.0/node-v10.16.0.pkg
- Open cmd to run  `npm install pm2 -g` and `npm install pm2-windows-startup -g`
- Copy source code to machine and run  `npm install` in directory 
- Test run `node main.js`
- Run command for start app on windows startup
	- `pm2 start main.js`
	- `pm2-startup install`
	- `pm2 save`