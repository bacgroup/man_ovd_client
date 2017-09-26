node("master") {
    stage "Build Packages"
    
    deleteDir()
    
    checkout scm
    sh "npm install"
    sh 'npm install electron-squirrel-startup'
    //sh 'npm install --save-dev electron-installer-windows'
    sh 'npm install --save-dev electron-winstaller'
    //sh 'npm install -g electron-installer-windows'
    stage "Archive Packages"
        if (env.BRANCH_NAME == 'master') {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=linux --arch=ia32  --icon=icon.ico"
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=linux --arch=x64  --icon=icon.ico"
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=darwin  --icon=icon.icns"
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=win32 --arch=x64  --icon=icon.ico"
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=win32 --arch=ia32  --icon=icon.ico"
        sh "node createwindowsinstaller.js"
        dir ('packages') {
            sh 'sudo chown jenkins:jenkins * -R'
            sh 'for i in */; do mv "$i" "${i%/}_build-${BUILD_NUMBER}_STABLE" ; done'
        }
        } else {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=linux --arch=ia32  --icon=icon_beta.png &" 
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=linux --arch=x64  --icon=icon_beta.png &"
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=darwin  --icon=icon_beta.icns &"
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=win32 --arch=x64  --icon=icon_beta.ico &"
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=win32 --arch=ia32  --icon=icon_beta.ico &"
        sh '''
        for job in `jobs -p`
        do
        echo $job
            wait $job || let "FAIL+=1"
        done
            echo $FAIL
            if [ "$FAIL" == "0" ];
                then
                echo "YAY!"
            else
                echo "FAIL! ($FAIL)"
            fi '''   
        sh "node createwindowsinstaller.js"
        dir ('packages') {
            sh 'sudo chown jenkins:jenkins * -R'
            sh 'for i in */; do mv "$i" "${i%/}_build-${BUILD_NUMBER}_BETA" ; done'
        }
        }
    dir ('packages') {
        sh 'for i in */; do zip -q "${i%/}.zip" -r "$i" ; done'
        archiveArtifacts "*.zip"
    }
    deleteDir()
}
