var installer = require('electron-installer-windows')

var options = {
  src: 'packages/man_ovd_client-win32-x64',
  dest: 'packages/man_ovd_client-win32-x64_installer'
}

console.log('Creating package (this may take a while)')

installer(options, function (err) {
  if (err) {
    console.error(err, err.stack)
    process.exit(1)
  }

  console.log('Successfully created package at ' + options.dest)
})

var options = {
  src: 'packages/man_ovd_client-win32-ia32',
  dest: 'packages/man_ovd_client-win32-ia32_installer'
}

console.log('Creating package (this may take a while)')

installer(options, function (err) {
  if (err) {
    console.error(err, err.stack)
    process.exit(1)
  }

  console.log('Successfully created package at ' + options.dest)
})
