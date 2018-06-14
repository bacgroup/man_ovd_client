node("master") {
    if (env.BRANCH_NAME == 'master') {
        STAGE='STABLE'
        PRERELEASE='false'
        ICON_STD="icon.png"
        ICON_DARWIN="icon.icns"
        ICON_WINDOWS="icon.ico"
    }
    else if (env.BRANCH_NAME == 'develop') {
        STAGE='BETA'
        PRERELEASE='true'
        ICON_STD="icon_beta.png"
        ICON_DARWIN="icon_beta.icns"
        ICON_WINDOWS="icon_beta.ico"
    }
    else {
        STAGE="ALPHA-"+"${BRANCH_NAME}"
        PRERELEASE='true'
        ICON_STD="icon_alpha.png"
        ICON_DARWIN="icon_alpha.icns"
        ICON_WINDOWS="icon_alpha.ico"
    }
    stage "Pepare to Build Packages"
    echo "${STAGE}"
    deleteDir()
    checkout scm
    sh "sed -i \"s/MANBUILD/MAN Application Delivery System V2.0 Build ${BUILD_NUMBER} (${STAGE} Release) /g\" index.html"
    sh "cp ${ICON_STD} app_icon.png"
    sh "npm install"
    sh 'npm install electron-squirrel-startup'
    //sh 'npm install --save-dev electron-installer-windows'
    sh 'npm install --save-dev electron-winstaller'
    sh 'sudo npm install -g electron-installer-debian'
    //sh 'npm install -g electron-installer-windows'
    stage "Create Packages"
    parallel(/* "Linux32": {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=linux --arch=ia32  --icon=${ICON_STD} --tmpdir=false"
    },*/
    "Linux64": {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=linux --arch=x64  --icon=${ICON_STD} --tmpdir=false"
    },
    "Darwin": {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=darwin  --icon=${ICON_DARWIN} --tmpdir=false"
    },
    "Win32": {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=win32 --arch=ia32  --icon=${ICON_WINDOWS} --tmpdir=false"
    }
    /*"Win64": {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=win32 --arch=x64  --icon=${ICON_WINDOWS} --tmpdir=false"
    }*/)
    stage "Create Installers"
            dir ('packages') {
    sh """cat <<EOF > config.json
{
  "dest": "..",
  "icon": "../${ICON_STD}",
  "categories": [
    "Utility"
  ],
  "depends": [
    "openjdk-8-jdk"
  ],
  "lintianOverrides": [
    "changelog-file-missing-in-native-package"
  ]
}
EOF"""
}
            parallel(
            "Windows ia32 Installer": {
                sh "node createwindows32installer.js"
            },
            /* "Windows x64 Installer": {
                sh "node createwindows64installer.js"
            },*/
            "Ubuntu / Debian amd64 Packages": {
                dir ('packages') {
                sh "electron-installer-debian --src MANOVDClient-linux-x64 --arch amd64 --config config.json"
            }
            }/* ,
            "Ubuntu / Debian i386 Packages": {
                dir ('packages') {
                sh "electron-installer-debian --src MANOVDClient-linux-ia32 --arch i386 --config config.json"
            }
            }*/  
            )
    stage "Tag with Build Number"
        dir ('packages') {
            sh 'sudo chown jenkins:jenkins * -R'
            //sh 'for i in */; do mv $i $i_build-${BUILD_NUMBER}_${STAGE} ; done"
            sh "rename 's/(.*)\$/\$1_build-${BUILD_NUMBER}_${STAGE}/' *"
            sh 'mv ../*.deb .'
        }
     stage "Zip Packages"
            dir ('packages') {
            parallel(
            /* "Zip Linux32": {
                sh "zip -q MANOVDClient-linux-ia32_build-${BUILD_NUMBER}_${STAGE}.zip -r MANOVDClient-linux-ia32_build-${BUILD_NUMBER}_${STAGE}"
            },
            "Zip Linux64": {
                sh "zip -q MANOVDClient-linux-x64_build-${BUILD_NUMBER}_${STAGE}.zip -r MANOVDClient-linux-x64_build-${BUILD_NUMBER}_${STAGE}"
            },*/
            "Zip Darwin": {
                sh "zip -q MANOVDClient-darwin-x64_build-${BUILD_NUMBER}_${STAGE}.zip -r MANOVDClient-darwin-x64_build-${BUILD_NUMBER}_${STAGE}"
            },
            /*"Zip Win32": {
                sh "zip -q MANOVDClient-win32-ia32_build-${BUILD_NUMBER}_${STAGE}.zip -r MANOVDClient-win32-ia32_build-${BUILD_NUMBER}_${STAGE}"
            },*/
             "Zip Win32 Installer": {
                sh "zip -q MANOVDClient-win32-ia32_installer_build-${BUILD_NUMBER}_${STAGE}.zip -r MANOVDClient-win32-ia32_installer_build-${BUILD_NUMBER}_${STAGE}"
            }/*,
             "Zip Win64": {
                sh "zip -q MANOVDClient-win32-x64_build-${BUILD_NUMBER}_${STAGE}.zip -r MANOVDClient-win32-x64_build-${BUILD_NUMBER}_${STAGE}"
            },
            "Zip Win64 Installer": {
                sh "zip -q MANOVDClient-win32-x64_installer_build-${BUILD_NUMBER}_${STAGE}.zip -r MANOVDClient-win32-x64_installer_build-${BUILD_NUMBER}_${STAGE}"
            }*/
            )
    }
    stage "Archive Artifacts"
     dir ('packages') {
        sh "mv *darwin* MAN_ADS_Client_2.0-OSX.zip"
        sh "mv *win32-ia32* MAN_ADS_Client_2.0-Windows.zip"
        sh "mv MANOVDClient_1.0.0_amd64.deb MAN_ADS_Client_2.0-Linux.deb"
        archiveArtifacts "*.zip"
        archiveArtifacts "*.deb"
     }
    //sh "git tag -a ${BUILD_NUMBER}_${ENVIRONMENT} -m '${ENVIRONMENT} Release from build ${BUILD_NUMBER}' && git push --tags"
    dir ('packages') {
        sh "curl -v -i -X POST -H \"Content-Type:application/json\" -H \"Authorization: token ${github_token}\" https://api.github.com/repos/bacgroup/man_ovd_client/releases -d '{\"tag_name\":\"man_ovd_client_${BUILD_NUMBER}_${STAGE}\",\"target_commitish\": \"${BRANCH_NAME}\",\"name\": \"MAN OVD Client Build ${BUILD_NUMBER} ${STAGE}\",\"body\": \"MAN Consulting Software\",\"draft\": false,\"prerelease\": ${PRERELEASE}}'"
        sh "for i in *.zip; do bash $HOME/github-release.sh github_api_token=${github_token} owner=bacgroup repo=man_ovd_client tag=man_ovd_client_${BUILD_NUMBER}_${STAGE} filename=./\$i; done"
        sh "for i in *.deb; do bash $HOME/github-release.sh github_api_token=${github_token} owner=bacgroup repo=man_ovd_client tag=man_ovd_client_${BUILD_NUMBER}_${STAGE} filename=./\$i; done"

    }
    deleteDir()
}
