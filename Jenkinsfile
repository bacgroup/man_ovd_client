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

    deleteDir()
        
    checkout scm
        
     sh 'sudo mkdir -p /var/lib/lxc/${JOB_BASE_NAME}-${BUILD_NUMBER}/rootfs/home/cust'
     sh "ls -l && pwd"
     sh 'sudo rsync -avP man_ovd_client /var/lib/lxc/${JOB_BASE_NAME}-${BUILD_NUMBER}/rootfs/home/cust/'
     sh 'sudo lxc-attach -n ${JOB_BASE_NAME}-${BUILD_NUMBER} -- chown root:root /home/cust -R'
     sh 'sudo lxc-attach -n ${JOB_BASE_NAME}-${BUILD_NUMBER} -- apt-get install -y zip unzip'
     sh "sudo lxc-attach -n ${JOB_BASE_NAME}-${BUILD_NUMBER} -- su -c \"cd /home/cust/ &&  npm install && npm install -g electron-packager \""

    }
    stage ("Archive Packages")
    {
        if (env.BRANCH_NAME == 'master') {
        sh 'sudo lxc-attach -n ${JOB_BASE_NAME}-${BUILD_NUMBER} -- su -c " cd /home/cust/man_ovd_client &&  electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all  --icon=icon.icns " '
        sh 'sudo lxc-attach -n ${JOB_BASE_NAME}-${BUILD_NUMBER} -- su -c " cd /home/cust/man_ovd_client/packages &&  for i in */; do mv "$i" "${i%/}_build-${BUILD_NUMBER}_STABLE" ; done"'
        } else {
        sh 'sudo lxc-attach -n ${JOB_BASE_NAME}-${BUILD_NUMBER} -- su -c " cd /home/cust/man_ovd_client &&  electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all  --icon=icon_beta.icns"'
        sh 'sudo lxc-attach -n ${JOB_BASE_NAME}-${BUILD_NUMBER} -- su -c "cd /home/cust/man_ovd_client/packages &&  for i in */; do mv "$i" "${i%/}_build-${BUILD_NUMBER}_BETA" ; done" '
        sh 'electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all  --icon=icon_beta.icns'
        }
        deleteDir()
        sh 'sudo rsync -avP /var/lib/lxc/${JOB_BASE_NAME}-${BUILD_NUMBER}/rootfs/home/cust/man_ovd_client/packages .'
        sh 'for i in */; do zip -q "${i%/}.zip" -r "$i" ; done'
        archiveArtifacts "*.zip"

    }
    stage("Destroy Container"){
        sh 'sudo lxc-destroy -n ${JOB_BASE_NAME}-${BUILD_NUMBER} -f'
    }
}
