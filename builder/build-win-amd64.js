
// for require('electron-packager');
// module.paths.unshift('C:\\Users\\whour\\AppData\\Roaming\\npm\\node_modules');
module.paths.unshift('C:\\Users\\whour\\node_modules');
const packager = module.require('electron-packager');
const package = require('../package.json');

// var slash = require('slash');
let dirName = __dirname.replace(/\\/g, '/');
console.log(dirName);

packager(
{
	name: package['name'],
	dir: dirName + '/../src',
	out: dirName + '/../dist',
	icon: dirName + '/../source/resource/icon.ico',
	platform: 'win32',
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



