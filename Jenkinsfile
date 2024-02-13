pipeline {
    agent any



    environment {
        SONAR_USER_HOME = "${WORKSPACE}/.sonar"
        GIT_DEPTH = "0"
    }

    stages {
        stage('install') {
            steps {
                script {
                    echo 'installing packages'
                    sh 'npm install'
                    echo "finished installing packages"
                    
                }
            }
        }
    }

    stages {
        stage('Test') {
            steps {
                script {
                    echo 'Start Test the app'
                    sh 'npm run test'
                    echo 'Finish Test the app.'
                }
            }
        }
    }

    stages {
        stage('Build') {
            steps {
                script {
                    echo 'Start Build the app'
                    sh 'npm run build-server'
                    echo 'Finish Build the app.'
                }
            }
        }
    }

        

 
}


