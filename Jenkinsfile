pipeline {
    agent any

    environment {
        // Change these variables to match your settings
        REGISTRY_CREDENTIALS_ID = 'docker-hub-credentials' // ID of credentials stored in Jenkins
        IMAGE_NAME              = 'your-dockerhub-username/racube-frontend'
        IMAGE_TAG               = "${BUILD_NUMBER}"
        EC2_CREDENTIALS_ID      = 'ec2-ssh-key' // Jenkins credentials ID for EC2 SSH private key
        EC2_USER                = 'ubuntu'
        EC2_IP                  = 'your-ec2-ip-address'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Build') {
            steps {
                echo 'Installing dependencies and building locally for validation...'
                sh 'npm install --legacy-peer-deps'
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image ${IMAGE_NAME}:${IMAGE_TAG}..."
                script {
                    appImage = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push to Registry') {
            steps {
                echo "Logging into Docker Hub and pushing image..."
                script {
                    docker.withRegistry('', REGISTRY_CREDENTIALS_ID) {
                        appImage.push()
                        appImage.push('latest')
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo "Deploying to EC2 instance at ${EC2_IP}..."
                sshagent([EC2_CREDENTIALS_ID]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_IP} '
                            # Ensure docker is running and pull latest image
                            sudo docker pull ${IMAGE_NAME}:latest
                            
                            # Stop existing container if running
                            sudo docker stop racube-frontend || true
                            sudo docker rm racube-frontend || true
                            
                            # Run the new container
                            sudo docker run -d \\
                                --name racube-frontend \\
                                -p 3000:3000 \\
                                --restart unless-stopped \\
                                ${IMAGE_NAME}:latest
                        '
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "Pipeline succeeded! Application deployed to http://${EC2_IP}"
        }
        failure {
            echo "Pipeline failed! Please check logs."
        }
    }
}
