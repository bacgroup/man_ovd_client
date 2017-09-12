node {
    stage("Create Container") {
        
        PROJECT_NAME=sh (
        script: "echo \"${JOB_NAME}-${BUILD_NUMBER}\"|sed 's&/&-&g'",
        returnStdout: true
        ).trim()
        
        sh "sudo lxc-create -t download -n \"${PROJECT_NAME}\" -- -d debian -r stretch -a amd64"
        sh "sudo lxc-start -n \"${PROJECT_NAME}\" -d"
        sh "sleep 2"
        sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- apt-get update -y"
        sh "sudo lxc-attach -n ${PROJECT_NAME} -- apt-get upgrade -y"
        
        sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- apt-get install -y curl wget"
        sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- curl -o nodejs.sh https://deb.nodesource.com/setup_6.x"
        sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- bash nodejs.sh"
        sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- apt-get update -y"
        sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- useradd -m -p ubuntu -s /bin/bash ubuntu"
        //sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- mkdir -p /root/.wine/dosdevices/z:/dev/core"
        //sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- su -c \"mkdir -p /home/ubuntu/.wine/dosdevices/z:/root\""
        sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- su -c "\"apt-get install -y wine32\""

        //sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- su -c \"apt-get install -y nodejs && dpkg --add-architecture i386 && apt-get -y update && apt-get install -y software-properties-common && echo ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true | sudo debconf-set-selections && wget https://dl.winehq.org/wine-builds/Release.key && apt-key add Release.key && apt-add-repository 'https://dl.winehq.org/wine-builds/ubuntu/' && apt-get update && apt-get install -y wine:i386 \""
    }
    stage("Generate Electon App") {

    deleteDir()
        
    checkout scm
    sh "sudo rsync -avP . /var/lib/lxc/${PROJECT_NAME}/rootfs/home/ubuntu/"
    sh "sudo lxc-attach -n ${PROJECT_NAME} -- apt-get install -y zip unzip"
    sh "sudo lxc-attach -n ${PROJECT_NAME} -- chown ubuntu:ubuntu /home/ubuntu/ -R"
    sh "sudo lxc-attach -n ${PROJECT_NAME} -- su -c \"npm install -g electron-packager && npm install -g electron\""
    sh "sudo lxc-attach -n ${PROJECT_NAME} -- su ubuntu -c \"cd /home/ubuntu && npm install\""
    sh "sudo lxc-attach -n ${PROJECT_NAME} -- "

    }
    stage ("Archive Packages")
    {
        /*if (env.BRANCH_NAME == 'master') {
        sh "sudo lxc-attach -n ${PROJECT_NAME} -- su -c 'cd /root/ && electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all  --icon=icon.icns'"
        sh "sudo lxc-attach -n ${PROJECT_NAME} -- su -c 'cd /root/packages/ && for i in ; do mv $i ${i%/}_build-${BUILD_NUMBER}_STABLE ; done'"
        } else {*/
        
        sh "sudo lxc-attach -n ${PROJECT_NAME} -- su ubuntu -c 'cd /home/ubuntu && electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all  --icon=icon_beta.icns'"
        //sh "sudo lxc-attach -n ${PROJECT_NAME} -- su -c 'cd /root/packages/ && for i in */; do mv $i ${i%/}_build-${BUILD_NUMBER}_BETA ; done'"
        
        deleteDir()
        sh 'sudo rsync -avP /var/lib/lxc/${PROJECT_NAME}/rootfs/home/ubuntu/packages .'
        sh 'for i in */; do zip -q "${i%/}.zip" -r "$i" ; done'
        archiveArtifacts "*.zip"

    }
    stage("Destroy Container"){
        sh 'sudo lxc-destroy -n ${PROJECT_NAME} -f'
    }
}
