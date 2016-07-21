// main.js - Assigned IP address viewer entry point file
// 
// Copyright (c) 2016 Takel Hinomoto
// This file is provided under the MIT license.
const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const os = require('os');

app.on('ready', () =>
{
	let mainWindow = new electron.BrowserWindow({width: 800, height: 600, show: false});
	let dirName = __dirname.replace(/\\/g, '/');
	mainWindow.loadURL('file://' + dirName + '/index.html');
	mainWindow.once('ready-to-show', () =>
	{
		mainWindow.show();
	});
	
	// Dispose mainWindow reference on the window closed.
	mainWindow.on('closed', () =>
	{
		mainWindow = null
	});
	
	let webContents = mainWindow.webContents;
	webContents.on('did-finish-load', () =>
	{
		// After this timing. We can send messages to the renderer process.
		// webContents.send('main-to-renderer', 'ping');
	});
});

// Terminate the app on all windows are closed.
// except OS-X for traditional conventional reason.
app.on('window-all-closed', () =>
{
	if (process.platform !== 'darwin')
	{
		app.quit();
	}
});

ipcMain.on('r2mIpAddressRequest', (event, arg) =>
{
	// console.log('r2mIpAddressRequest has come.');
	const networkInterfaces = os.networkInterfaces();
	for (let interfaceDevice in networkInterfaces)
	{
		networkInterfaces[interfaceDevice].forEach((whatDescribed) =>
		{
			// console.log(whatDescribed);
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

