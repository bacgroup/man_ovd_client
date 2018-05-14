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
    sh "cp ${ICON_STD} app_icon.png"
    sh "npm install"
    sh 'npm install electron-squirrel-startup'
    //sh 'npm install --save-dev electron-installer-windows'
    sh 'npm install --save-dev electron-winstaller'
    sh 'sudo npm install -g electron-installer-debian'
    //sh 'npm install -g electron-installer-windows'
    stage "Create Packages"
    parallel("Linux32": {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=linux --arch=ia32  --icon=${ICON_STD} --tmpdir=false"
    },
    "Linux64": {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=linux --arch=x64  --icon=${ICON_STD} --tmpdir=false"
    },
    "Darwin": {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=darwin  --icon=${ICON_DARWIN} --tmpdir=false"
    },
    "Win32": {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=win32 --arch=ia32  --icon=${ICON_WINDOWS} --tmpdir=false"
    },
    "Win64": {
        sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --platform=win32 --arch=x64  --icon=${ICON_WINDOWS} --tmpdir=false"
    })            
