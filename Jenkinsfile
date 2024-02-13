pipeline {
    agent any

    environment {
        SONAR_USER_HOME = "${WORKSPACE}/.sonar"
        GIT_DEPTH = '0'
    }

    stages {


        stage('Build (Master)') {
            when {
                        expression { BRANCH_NAME == 'master' }
            }
            steps {
                script {
                        echo "Current directory: ${pwd()}"
                        sh 'git checkout master'
                        sh 'git pull origin master'
                        echo 'Start Installing dependencies'
                        sh 'npm i'
                        echo 'Finish Installing dependencies'
                        echo 'Start Build the app'
                        sh 'npm run build-server'
                        echo 'Finish Build the app.'
                }
            }
        }

        stage('Unit Test (Master)') {
            when {
                        expression { BRANCH_NAME == 'master' }
            }
            steps {
                script {
                        echo 'Start test'
                        sh 'npm test'
                        echo 'End test'
                }
            }
        }

        stage('Unit Test (Not Master)') {
            when {
                        expression { BRANCH_NAME != 'master' }
            }
            steps {
                script {
                        echo 'Start test'
                        sh 'npm test'
                        echo 'End test'
                }
            }
        }

        stage('Build (Not Master)') {
            when {
                        expression { BRANCH_NAME != 'master' }
            }
            steps {
                script {
                        sh "git checkout ${BRANCH_NAME}"
                        sh "git pull origin ${BRANCH_NAME}"
                        echo 'Start Installing dependencies'
                        sh 'npm i'
                        echo 'Finish Installing dependencies'
                        echo 'Start Build the app'
                        sh 'npm run build-server'
                        echo 'Finish Build the app.'
                }
            }
        }
    }
}


