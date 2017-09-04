node{
    stage('Buid')
    {
        echo 'Build'
        sh 'ls -lh'
        sh 'pwd'
    }
    stage('Test')
    {
        echo 'Test'
    }
    stage('Deploy')
    {
        echo 'Deploy'
    }
}


// This shows a simple example of how to archive the build output artifacts.
node {
    stage "Create build output"
    
    // Make the output directory.
    sh "sudo npm install -g electron-packager"
    sh "sudo npm install -g electron-installer-debian"
    
    stage "Archive build output"
    
    // Archive the build output artifacts.
    //archiveArtifacts artifacts: 'output/*''
}
