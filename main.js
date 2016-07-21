// main.js - Assigned IP address viewer entry point file
// 
// Copyright (c) 2016 Takel Hinomoto
// This file is provided under the MIT license.
process.stderr.write('[trace]show-ip-addr - 0\n');
const electron = require('electron');
process.stderr.write('[trace]show-ip-addr - 1\n');
const app = electron.app;
process.stderr.write('[trace]show-ip-addr - 2\n');
const ipcMain = electron.ipcMain;
process.stderr.write('[trace]show-ip-addr - 3\n');
const os = require('os');
process.stderr.write('[trace]show-ip-addr - 4\n');

app.on('ready', () =>
{
	process.stderr.write('[trace]show-ip-addr - on app ready - 1\n');
	let mainWindow = new electron.BrowserWindow({width: 800, height: 600, show: false});
	process.stderr.write('[trace]show-ip-addr - on app ready - 2\n');
	let dirName = __dirname.replace(/\\/g, '/');
	process.stderr.write('[trace]show-ip-addr - on app ready - 3\n');
	mainWindow.loadURL('file://' + dirName + '/index.html');
	process.stderr.write('[trace]show-ip-addr - on app ready - 4\n');
	mainWindow.once('ready-to-show', () =>
	{
		process.stderr.write('[trace]show-ip-addr - on app ready - 5\n');
		mainWindow.show();
		process.stderr.write('[trace]show-ip-addr - on app ready - 6\n');
	});
	
	process.stderr.write('[trace]show-ip-addr - on app ready - 7\n');
	// Dispose mainWindow reference on the window closed.
	mainWindow.on('closed', () =>
	{
		process.stderr.write('[trace]show-ip-addr - on app ready - 8\n');
		mainWindow = null
	});
	process.stderr.write('[trace]show-ip-addr - on app ready - 9\n');
	let webContents = mainWindow.webContents;
	webContents.on('did-finish-load', () =>
	{
		process.stderr.write('[trace]show-ip-addr - on app ready - 10\n');
		// After this timing. We can send messages to the renderer process.
		// webContents.send('main-to-renderer', 'ping');
	});
});
process.stderr.write('[trace]show-ip-addr - 5\n');

// Terminate the app on all windows are closed.
// except OS-X for traditional conventional reason.
app.on('window-all-closed', () =>
{
	if (process.platform !== 'darwin')
	{
		app.quit();
	}
});
process.stderr.write('[trace]show-ip-addr - 6\n');
ipcMain.on('r2mIpAddressRequest', (event, arg) =>
{
	process.stderr.write('[trace]show-ip-addr - on request - 1\n');
	// process.stderr.write('r2mIpAddressRequest has come.');
	const networkInterfaces = os.networkInterfaces();
	process.stderr.write('[trace]show-ip-addr - on request - 2\n');
	for (let interfaceDevice in networkInterfaces)
	{
		networkInterfaces[interfaceDevice].forEach((whatDescribed) =>
		{
			// process.stderr.write(whatDescribed);
			if (whatDescribed.internal) { return; }
			
			switch(whatDescribed.family)
			{
				case 'IPv4':
					event.sender.send('m2rIpAddressResponse', { 'type': 'v4', 'name': interfaceDevice, 'address': whatDescribed.address });
					break;
				case 'IPv6':
					event.sender.send('m2rIpAddressResponse', { 'type': 'v6', 'name': interfaceDevice, 'address': whatDescribed.address });
					break;
			}
		});
	}
});
process.stderr.write('[trace]show-ip-addr - 7\n');
