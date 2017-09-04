node {
    stage "Build"
    sh "sudo npm install -g electron-packager"
    sh "sudo npm install -g electron-installer-debian"
    checkout scm    
    sh "ls"
    sh "pwd"
    stage "Generate Packages"
    
    // Archive the build output artifacts.
    //archiveArtifacts artifacts: 'output/*''
}
