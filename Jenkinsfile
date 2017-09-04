node {
    stage "Create build output"
    checkout scm    
    sh "ls"
    sh "pwd"
    sh "sudo npm install -g electron-packager"
    sh "sudo npm install -g electron-installer-debian"
    
    stage "Archive build output"
    
    // Archive the build output artifacts.
    //archiveArtifacts artifacts: 'output/*''
}
