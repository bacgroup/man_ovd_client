var electronInstaller = require('electron-winstaller');


resultPromise1 = electronInstaller.createWindowsInstaller({
    appDirectory: 'packages/MANOVDClient-win32-x64',
    outputDirectory: 'packages/MANOVDClient-win32-x64_installer',
    authors: 'MAN Consulting',
    //exe: 'man_ovd_client.exe',
    skipUpdateIcon: true,
    setupIcon: "icon.ico",
    setupExe: 'Install.exe'
  });

resultPromise1.then(() => console.log("Win64 Installer!"), (e) => console.log(`No dice: ${e.message}`));
