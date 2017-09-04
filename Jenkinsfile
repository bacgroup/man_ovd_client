node {
    stage "Build"
    checkout scm
    sh "npm install"
    sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all"
    sh "ls"
    sh "pwd"
    stage "Generate Packages"
    sh 'for i in packages/*/; do zip "${i%/}.zip" -r "$i" ; done'
    archiveArtifacts "packages/*.zip"
    deleteDir()
}
