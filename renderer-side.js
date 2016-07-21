// renderer-side.js - Assigned IP address viewer renderer process js
// 
// Copyright (c) 2016 Takel Hinomoto
// This file is provided under the MIT license.
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

((global) =>
{
	global.addEventListener('load', (event) =>
	{
		ipcRenderer.send('r2mIpAddressRequest', '');
	});
	
	ipcRenderer.on('m2rIpAddressResponse', (sender, arg) =>
	{
		let addrList = global.document.getElementById('addr-list');
		let newElement = global.document.createElement('li');
		newElement.textContent = ''+ arg.address;
		addrList.appendChild(newElement);
	});
})(this);
