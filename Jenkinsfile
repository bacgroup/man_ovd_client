node {
    stage("Create Container") {
        
        PROJECT_NAME=sh (
        script: "echo \"${JOB_NAME}-${BUILD_NUMBER}\"|sed 's&/&-&g'",
        returnStdout: true
        ).trim()
        
        sh "sudo lxc-create -t download -n \"${PROJECT_NAME}\" -- -d ubuntu -r xenial -a amd64"
        sh "sudo lxc-start -n \"${PROJECT_NAME}\" -d"
        sh "sleep 5"
        sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- apt-get update -y"
        sh "sudo lxc-attach -n ${PROJECT_NAME} -- apt-get upgrade -y"
        
        sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- apt-get install -y curl wget"
        sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- curl -o nodejs.sh https://deb.nodesource.com/setup_6.x"
        sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- bash nodejs.sh"
        sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- apt-get update -y"
        sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- mkdir -p /root/.wine/dosdevices/z:/dev/core"
        sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- su -c \"apt-get install -y nodejs && dpkg --add-architecture i386 && apt-get -y update && echo ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true | sudo debconf-set-selections && apt-get install -y wine32\""
    }
    stage("Generate Electon App") {

    deleteDir()
        
    checkout scm
    sh "sudo rsync -avP . /var/lib/lxc/${PROJECT_NAME}/rootfs/root"
    sh "sudo lxc-attach -n ${PROJECT_NAME} -- apt-get install -y zip unzip"
    sh "sudo lxc-attach -n ${PROJECT_NAME} -- chown root:root /root -R"
    sh "sudo lxc-attach -n ${PROJECT_NAME} -- su -c \" cd /root && npm install -g electron-packager && npm install -g electron && npm install\""
    sh "sudo lxc-attach -n ${PROJECT_NAME} -- "

    }
    stage ("Archive Packages")
    {
        /*if (env.BRANCH_NAME == 'master') {
        sh "sudo lxc-attach -n ${PROJECT_NAME} -- su -c 'cd /root/ && electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all  --icon=icon.icns'"
        sh "sudo lxc-attach -n ${PROJECT_NAME} -- su -c 'cd /root/packages/ && for i in ; do mv $i ${i%/}_build-${BUILD_NUMBER}_STABLE ; done'"
        } else {*/
        
        sh "sudo lxc-attach -n ${PROJECT_NAME} -- su -c 'cd /root/ && electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all  --icon=icon_beta.icns'"
        //sh "sudo lxc-attach -n ${PROJECT_NAME} -- su -c 'cd /root/packages/ && for i in */; do mv $i ${i%/}_build-${BUILD_NUMBER}_BETA ; done'"
        
        deleteDir()
        sh 'sudo rsync -avP /var/lib/lxc/${PROJECT_NAME}/rootfs/root/packages .'
        sh 'for i in */; do zip -q "${i%/}.zip" -r "$i" ; done'
        archiveArtifacts "*.zip"

    }
    stage("Destroy Container"){
        sh 'sudo lxc-destroy -n ${PROJECT_NAME} -f'
    }
}
