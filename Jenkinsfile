node("master") {
    stage "Build Packages"
    
    deleteDir()
    
    checkout scm
    sh "npm install"
    stage "Archive Packages"
        if (env.BRANCH_NAME == 'master') {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all  --icon=icon.icns"
        dir ('packages') {
            sh 'for i in */; do mv "$i" "${i%/}_build-${BUILD_NUMBER}_STABLE" ; done'
        }
        } else {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all  --icon=icon_beta.icns"
        dir ('packages') {
            sh 'for i in */; do mv "$i" "${i%/}_build-${BUILD_NUMBER}_BETA" ; done'
            sh 'npm install --save-dev electron-winstaller'
        }
        }
    dir ('packages') {
        sh 'for i in */; do zip -q "${i%/}.zip" -r "$i" ; done'
        archiveArtifacts "*.zip"
    }
    deleteDir()
}
