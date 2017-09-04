node {
    stage "Build"
    sh "sudo npm install -g electron-packager"
    sh "sudo npm install -g electron-installer-debian"
    checkout scm
    sh "npm install"
    sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all"
    sh "ls"
    sh "pwd"
    stage "Generate Packages"
    archiveArtifacts artifacts: "packages/*"
    deleteDir()
}
