node {
    stage "Create build output"
    //git url: 'https://github.com/bacgroup/man_ovd_client.git'
    
    sh "ls"
    sh "pwd"
    sh "sudo npm install -g electron-packager"
    sh "sudo npm install -g electron-installer-debian"
    
    stage "Archive build output"
    
    // Archive the build output artifacts.
    //archiveArtifacts artifacts: 'output/*''
}
