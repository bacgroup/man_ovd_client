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
    sh """ 
    cd packages
    for i in */; do zip "${i%/}.zip" -r "$i" ; done
    cd ..
    """
    archiveArtifacts artifacts: 'packages/*.zip'
    deleteDir()
}
