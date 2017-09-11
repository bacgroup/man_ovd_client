node {
    stage("Create Container") {
        sh 'sudo lxc-create -t download -n "${JOB_BASE_NAME}-${BUILD_NUMBER}" -- -d ubuntu -r xenial -a amd64'
        sh 'sudo lxc-start -n ${JOB_BASE_NAME}-${BUILD_NUMBER} -d'
        sh 'sudo lxc-attach -n ${JOB_BASE_NAME}-${BUILD_NUMBER} -- apt-get update -y'
        sh 'sudo lxc-attach -n ${JOB_BASE_NAME}-${BUILD_NUMBER} -- apt-get upgrade -y'
        
        sh 'sudo lxc-attach -n ${JOB_BASE_NAME}-${BUILD_NUMBER} -- apt-get install curl'
        sh 'sudo lxc-attach -n ${JOB_BASE_NAME}-${BUILD_NUMBER} -- curl -sL https://deb.nodesource.com/setup_6.x | bash -'
        sh 'sudo lxc-attach -n ${JOB_BASE_NAME}-${BUILD_NUMBER} -- apt-get install -y nodejs'
    }
    stage("Generate Electon App") {
    
    }
    stage("Destroy Container"){
        sh 'sudo lxc-destroy -n ${JOB_BASE_NAME}-${BUILD_NUMBER} -f'
    }
}
