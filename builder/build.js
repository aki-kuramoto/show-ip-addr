
// for require('electron-packager');
// module.paths.unshift('C:\\Users\\whour\\AppData\\Roaming\\npm\\node_modules');
module.paths.unshift('C:\\Users\\whour\\node_modules');
const packager = module.require('electron-packager');
const package = require('../package.json');

packager(
{
	name: package['name'],
	dir: '../sources',
	out: '../dist',
	icon: '../source/resource/icon.ico',
	platform: 'linux',
	arch: 'x64',
	version: '1.2.8',
	overwrite: true,
	asar: false,
	'app-version': package['version'],
	'app-copyright': 'Copyright (C) 2016 '+ package['author'] +'.',
	'version-string':
	{
		CompanyName: '',
		FileDescription: package["name"],
		OriginalFilename: package["name"]+".exe",
		ProductName: package["name"],
		InternalName: package["name"]
	}
}, function (err, appPaths)
{
	if (err) console.log(err);
	console.log("Done: " + appPaths);
});



