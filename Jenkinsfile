pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image locally on EC2...'
                sh 'docker build -t racube-frontend:latest .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application container locally on EC2...'
                sh '''
                    # Stop and remove existing container if running
                    docker stop racube-frontend || true
                    docker rm racube-frontend || true
                    
                    # Run the container mapping host port 3000 to container port 3000
                    docker run -d \
                        --name racube-frontend \
                        -p 3000:3000 \
                        --restart unless-stopped \
                        racube-frontend:latest
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "Pipeline succeeded! Application deployed to http://localhost:3000"
        }
        failure {
            echo "Pipeline failed! Please check logs."
        }
    }
}
