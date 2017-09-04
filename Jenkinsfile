node {
    stage "Create build output"
    
    sh "sudo npm install -g electron-packager"
    sh "sudo npm install -g electron-installer-debian"
    
    stage "Archive build output"
    
    // Archive the build output artifacts.
    //archiveArtifacts artifacts: 'output/*''
}
