node {
    stage("Create Container") {
        sh "sudo lxc-create -t download -n ${JOB_NAME}-${BUILD_NUMBER} -- -d ubuntu -r xenial -a amd64"
        sh "sudo lxc-start -n ${JOB_NAME}-${BUILD_NUMBER} -d"
        sh "sleep 5"
        sh "sudo lxc-attach -n ${JOB_NAME}-${BUILD_NUMBER} -- apt-get update -y"
        sh "sudo lxc-attach -n ${JOB_NAME}-${BUILD_NUMBER} -- apt-get upgrade -y"
        
        sh "sudo lxc-attach -n ${JOB_NAME}-${BUILD_NUMBER} -- apt-get install curl"
        sh "sudo lxc-attach -n ${JOB_NAME}-${BUILD_NUMBER} -- curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -"
        sh "sudo lxc-attach -n ${JOB_NAME}-${BUILD_NUMBER} -- apt-get install -y nodejs"
    }
    stage("Generate Electon App") {

    deleteDir()
        
    checkout scm
        
     sh "sudo mkdir -p /var/lib/lxc/${JOB_NAME}-${BUILD_NUMBER}/rootfs/home/cust"
     sh "ls -l && pwd"
     sh "sudo rsync -avP * /var/lib/lxc/${JOB_BASE_NAME}-${BUILD_NUMBER}/rootfs/home/pkg/"
     sh "sudo lxc-attach -n ${JOB_NAME}-${BUILD_NUMBER} -- chown root:root /home/pkg -R"
     sh "sudo lxc-attach -n ${JOB_NAME}-${BUILD_NUMBER} -- apt-get install -y zip unzip"
     sh "sudo lxc-attach -n ${JOB_NAME}-${BUILD_NUMBER} -- bash -c \"cd /home/pkg/ &&  npm install && npm install -g electron-packager \""

    }
    stage ("Archive Packages")
    {
        if (env.BRANCH_NAME == 'master') {
        sh 'sudo lxc-attach -n ${JOB_NAME}-${BUILD_NUMBER} -- bash -c " cd /home/pkg &&  electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all  --icon=icon.icns " '
        sh 'sudo lxc-attach -n ${JOB_BASE_NAME}-${BUILD_NUMBER} -- bash -c " cd /home/pkg/packages &&  for i in */; do mv "$i" "${i%/}_build-${BUILD_NUMBER}_STABLE" ; done"'
        } else {
        sh 'sudo lxc-attach -n ${JOB_NAME}-${BUILD_NUMBER} -- bash -c " cd /home/pkg &&  electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all  --icon=icon_beta.icns"'
        sh 'sudo lxc-attach -n ${JOB_NAME}-${BUILD_NUMBER} -- bash -c "cd /home/pkg/packages &&  for i in */; do mv "$i" "${i%/}_build-${BUILD_NUMBER}_BETA" ; done" '
        }
        deleteDir()
        sh 'sudo rsync -avP /var/lib/lxc/${JOB_NAME}-${BUILD_NUMBER}/rootfs/home/pkg/packages .'
        sh 'for i in */; do zip -q "${i%/}.zip" -r "$i" ; done'
        archiveArtifacts "*.zip"

    }
    stage("Destroy Container"){
        sh 'sudo lxc-destroy -n ${JOB_NAME}-${BUILD_NUMBER} -f'
    }
}
