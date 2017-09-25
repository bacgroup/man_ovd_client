var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: 'packages/man_ovd_client-win32-ia32',
    outputDirectory: 'packages/man_ovd_client-win32-ia32/man_ovd_client-win32-ia32_installer',
    authors: 'MAN Consulting',
    exe: 'man_ovd_client.exe'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));
