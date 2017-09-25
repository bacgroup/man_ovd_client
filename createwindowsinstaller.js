var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: 'packages/man_ovd_client-win32-ia32',
    outputDirectory: 'packages/man_ovd_client-win32-ia32_installer',
    authors: 'MAN Consulting',
    exe: 'man_ovd_client.exe',
    setupExe: 'Installer32.exe'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));

resultPromise1 = electronInstaller.createWindowsInstaller({
    appDirectory: 'packages/man_ovd_client-win32-x64',
    outputDirectory: 'packages/man_ovd_client-win32-x64_installer',
    authors: 'MAN Consulting',
    exe: 'man_ovd_client.exe',
    setupExe: 'Installer64.exe'
  });

resultPromise1.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));
