var electronInstaller = require('electron-winstaller');


resultPromise1 = electronInstaller.createWindowsInstaller({
    appDirectory: 'packages/man_ovd_client-win32-x64',
    outputDirectory: 'packages/man_ovd_client-win32-x64_installer',
    authors: 'MAN Consulting',
    //exe: 'man_ovd_client.exe',
    setupIcon: "icon.ico",
    setupExe: 'Install.exe'
  });

resultPromise1.then(() => console.log("Win64 Installer!"), (e) => console.log(`No dice: ${e.message}`));
