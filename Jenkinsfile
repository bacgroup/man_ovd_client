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
        sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- curl -o node.sh https://deb.nodesource.com/setup_6.x && ls -l && pwd && bash node.sh"
        sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- apt-get update -y"
        sh "sudo lxc-attach -n \"${PROJECT_NAME}\" -- apt-get install -y nodejs"
    }
    stage("Generate Electon App") {

    deleteDir()
        
    checkout scm
        
     sh "sudo mkdir -p /var/lib/lxc/${PROJECT_NAME}/rootfs/home/pkg"
     sh "ls -l && pwd"
     sh "sudo rsync -avP * /var/lib/lxc/${PROJECT_NAME}/rootfs/home/pkg/"
     sh "sudo lxc-attach -n ${PROJECT_NAME} -- chown root:root /home/pkg -R"
     sh "sudo lxc-attach -n ${PROJECT_NAME} -- apt-get install -y zip unzip"
     sh "sudo lxc-attach -n ${PROJECT_NAME} -- bash -c \"cd /home/pkg/ &&  npm install && npm install -g electron-packager \""

    }
    stage ("Archive Packages")
    {
        if (env.BRANCH_NAME == 'master') {
        sh 'sudo lxc-attach -n ${PROJECT_NAME} -- bash -c " cd /home/pkg &&  electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all  --icon=icon.icns " '
        sh 'sudo lxc-attach -n ${PROJECT_NAME} -- bash -c " cd /home/pkg/packages &&  for i in */; do mv "$i" "${i%/}_build-${BUILD_NUMBER}_STABLE" ; done"'
        } else {
        sh 'sudo lxc-attach -n ${PROJECT_NAME} -- bash -c " cd /home/pkg &&  electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all  --icon=icon_beta.icns"'
        sh 'sudo lxc-attach -n ${PROJECT_NAME} -- bash -c "cd /home/pkg/packages &&  for i in */; do mv "$i" "${i%/}_build-${BUILD_NUMBER}_BETA" ; done" '
        }
        deleteDir()
        sh 'sudo rsync -avP /var/lib/lxc/${PROJECT_NAME}/rootfs/home/pkg/packages .'
        sh 'for i in */; do zip -q "${i%/}.zip" -r "$i" ; done'
        archiveArtifacts "*.zip"

    }
    stage("Destroy Container"){
        sh 'sudo lxc-destroy -n ${PROJECT_NAME} -f'
    }
}
