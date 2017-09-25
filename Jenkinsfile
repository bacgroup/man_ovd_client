node("master") {
    stage "Build Packages"
    
    deleteDir()
    
    checkout scm
    sh "npm install"
    //sh 'npm install --save-dev electron-winstaller'
    //sh 'npm install -g electron-installer-windows'
    stage "Archive Packages"
        if (env.BRANCH_NAME == 'master') {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all  --icon=icon.icns"
            //sh "node createwindowsinstaller.js"
            sh 'mkdir -p packages/man_ovd_client-win32-x64_installer && mkdir -p packages/man_ovd_client-win32-ia32_installer'
            sh 'electron-installer-windows --src packages/man_ovd_client-win32-x64 --dest packages/man_ovd_client-win32-x64_installer'
            sh 'electron-installer-windows --src packages/man_ovd_client-win32-ia32 --dest packages/man_ovd_client-win32-ia32_installer'
        dir ('packages') {
            sh 'for i in */; do mv "$i" "${i%/}_build-${BUILD_NUMBER}_STABLE" ; done'
        }
        } else {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all  --icon=icon_beta.icns"
           //sh "node createwindowsinstaller.js"
            sh 'mkdir -p packages/man_ovd_client-win32-x64_installer && mkdir -p packages/man_ovd_client-win32-ia32_installer'
            sh 'electron-installer-windows --src packages/man_ovd_client-win32-x64 --dest packages/man_ovd_client-win32-x64_installer'
            sh 'electron-installer-windows --src packages/man_ovd_client-win32-ia32 --dest packages/man_ovd_client-win32-ia32_installer'
        dir ('packages') {
            sh 'for i in */; do mv "$i" "${i%/}_build-${BUILD_NUMBER}_BETA" ; done'
        }
        }
    dir ('packages') {
        sh 'for i in */; do zip -q "${i%/}.zip" -r "$i" ; done'
        archiveArtifacts "*.zip"
    }
    deleteDir()
}
