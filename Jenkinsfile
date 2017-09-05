node {
    stage "Build Packages"
    checkout scm
    sh "npm install"
    sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all  --icon=icon.icns"
    sh "ls"
    sh "pwd"
    stage "Archive Packages"
    dir ('packages') {
        if (env.BRANCH_NAME == 'master') {
        sh 'for i in */; do mv "$i" "${i%/}_build-${BUILD_NUMBER}_STABLE" ; done'
        } else {
        sh 'for i in */; do mv "$i" "${i%/}_build-${BUILD_NUMBER}_BETA" ; done'
        }
        sh 'for i in */; do zip -q "${i%/}.zip" -r "$i" ; done'
        archiveArtifacts "*.zip"
    }
    deleteDir()
}
