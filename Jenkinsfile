pipeline {
    agent {
        docker {
            image 'node:14.16.1'
            args '-u root'
        }
    }

    environment {
        SONAR_USER_HOME = "${WORKSPACE}/.sonar"
        GIT_DEPTH = '0'
    }

    stages {


        stage('Build (Master)') {
            when {
                        expression { env.BRANCH_NAME == 'master' }
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
                        expression { env.BRANCH_NAME == 'master' }
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
                        expression { env.BRANCH_NAME != 'master' }
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
                        expression { env.BRANCH_NAME != 'master' }
            }
            steps {
                script {
                        sh "git checkout ${env.BRANCH_NAME}"
                        sh "git pull origin ${env.BRANCH_NAME}"
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

