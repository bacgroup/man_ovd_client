node("master") {
    stage "Build Packages"
    
    deleteDir()
    
    checkout scm
    sh "npm install"
    sh 'npm install electron-squirrel-startup'
    //sh 'npm install --save-dev electron-installer-windows'
    sh 'npm install --save-dev electron-winstaller'
    //sh 'npm install -g electron-installer-windows'
    stage "Create Packages"
    parallel("Linux32": {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=linux --arch=ia32  --icon=icon_beta.png --tmpdir=false"
    },
    "Linux64": {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=linux --arch=x64  --icon=icon_beta.png --tmpdir=false"
    },
    "Darwin": {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=darwin  --icon=icon_beta.icns --tmpdir=false"
    },
    "Win32": {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=win32 --arch=ia32  --icon=icon_beta.ico --tmpdir=false"
    },
    "Win64": {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=win32 --arch=x64  --icon=icon_beta.ico --tmpdir=false"
    })            
    stage "Create Installers"
            parallel(
            "Windows ia32 Installer": {
                sh "node createwindows32installer.js"
            },
             "Windows x64 Installer": {
                sh "node createwindows64installer.js"
            }
            )
        dir ('packages') {
            sh 'sudo chown jenkins:jenkins * -R'
            sh 'for i in */; do mv "$i" "${i%/}_build-${BUILD_NUMBER}_BETA" ; done'
        }
     stage "Zip Packages"
            dir ('packages') {
            parallel(
            "Zip Linux32": {
                sh "zip -q man_ovd_client-linux-ia32_build-${BUILD_NUMBER}_BETA.zip -r man_ovd_client-linux-ia32_build-${BUILD_NUMBER}_BETA"
            },
             "Zip Linux64": {
                sh "zip -q man_ovd_client-linux-x64_build-${BUILD_NUMBER}_BETA.zip -r man_ovd_client-linux-x64_build-${BUILD_NUMBER}_BETA"
            },
            "Zip Darwin": {
                sh "zip -q man_ovd_client-darwin-x64_build-${BUILD_NUMBER}_BETA.zip -r man_ovd_client-darwin-x64_build-${BUILD_NUMBER}_BETA"
            },
            "Zip Win32": {
                sh "zip -q man_ovd_client-win32-ia32_build-${BUILD_NUMBER}_BETA.zip -r man_ovd_client-win32-ia32_build-${BUILD_NUMBER}_BETA"
            },
            "Zip Win64": {
                sh "zip -q man_ovd_client-win32-x64_build-${BUILD_NUMBER}_BETA.zip -r man_ovd_client-win32-x64_build-${BUILD_NUMBER}_BETA"
            })
        archiveArtifacts "*.zip"
    }
    deleteDir()
}
