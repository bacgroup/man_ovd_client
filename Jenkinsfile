node {
    stage "Build"
    checkout scm
    sh "npm install"
    sh "electron-packager . --overwrite --out packages --ignore packages --build-version ${BUILD_NUMBER} --all"
    sh "ls"
    sh "pwd"
    stage "Generate Packages"
    if (env.BRANCH_NAME == 'master') {
    sh 'for i in packages/*/; do mv "$i" "${i%/}_Build-${BUILD_NUMBER}_STABLE_Release" ; done'
    } else {
    sh 'for i in packages/*/; do mv "$i" "${i%/}_Build-${BUILD_NUMBER}_BETA_Release" ; done'
    }
    sh 'for i in packages/*/; do zip -q "${i%/}.zip" -r "$i" ; done'
    archiveArtifacts "packages/*.zip"
    deleteDir()
}
