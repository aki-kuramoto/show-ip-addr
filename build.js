const packager = require('electron-packager');
const package = require('./package.json');

packager(
{
	name: package['name'],
	
	// Where source files there are.
	dir: './',
	
	// 出力先フォルダのパス
	out: './dist',
	
	// アイコンのパス
	// icon: './source/icon.ico',
	
	platform: 'win32',
	
	arch: 'x64',
	
	// Electronのバージョン
	version: '1.0.1',
	
	// 上書き
	overwrite: true,
	
	// asarパッケージ化
	asar: false,
	
	// アプリバージョン
	'app-version': package['version'],
	
	// コピーライト
	"app-copyright": "Copyright (C) 2016 "+package["author"]+".",
	
	// Windowsのみのオプション
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
	// 完了時のコールバック
	if (err) console.log(err);
	console.log("Done: " + appPaths);
});

