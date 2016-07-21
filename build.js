const packager = require('electron-packager');
const package = require('./package.json');

packager(
{
	name: package['name'],
	
	// Where source files there are.
	dir: './',
	
	// �o�͐�t�H���_�̃p�X
	out: './dist',
	
	// �A�C�R���̃p�X
	// icon: './source/icon.ico',
	
	platform: 'win32',
	
	arch: 'x64',
	
	// Electron�̃o�[�W����
	version: '1.0.1',
	
	// �㏑��
	overwrite: true,
	
	// asar�p�b�P�[�W��
	asar: false,
	
	// �A�v���o�[�W����
	'app-version': package['version'],
	
	// �R�s�[���C�g
	"app-copyright": "Copyright (C) 2016 "+package["author"]+".",
	
	// Windows�݂̂̃I�v�V����
	"version-string":
	{
		CompanyName: "totoraj.net",
		FileDescription: package["name"],
		OriginalFilename: package["name"]+".exe",
		ProductName: package["name"],
		InternalName: package["name"]
	}
}, function (err, appPaths)
{
	// �������̃R�[���o�b�N
	if (err) console.log(err);
	console.log("Done: " + appPaths);
});

