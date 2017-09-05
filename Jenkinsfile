node {
    stage "Build"
    checkout scm
    sh "npm install"
    sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all"
    sh "ls"
    sh "pwd"
    stage "Generate Packages"
    if (env.BRANCH_NAME == 'master') {
    sh 'for i in packages/*/; do mv "$i" "${i%/}_build-${BUILD_NUMBER}_STABLE" ; done'
    } else {
    sh 'for i in packages/*/; do mv "$i" "${i%/}_build-${BUILD_NUMBER}_BETA" ; done'
    }
    sh 'for i in packages/*/; do zip -q "${i%/}.zip" -r "$i" ; done'
    archiveArtifacts "packages/*.zip"
    deleteDir()
}
