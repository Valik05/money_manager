pipeline {
    agent any

    environment {
        VITE_APP_BASE_API_URL = "https://back-cash-planner.sitera.tech/api/v1"
        VITE_APP_BASE_DISCORD_URL="https://discord.gg/JugjTnH6"
        VITE_APP_BASE_GITHUB_URL="https://github.com/Valik05/money_manager"
        KUBECONFIG = credentials('kubeconfig')
        DOCKERHUB_CREDENTIALS = credentials('docker-iuda')
        IMAGE_NAME = "iuda194/sicst_front:prod"
    }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Выполнение команды docker build . в корне проекта
                    sh 'docker build -t ${IMAGE_NAME} .'
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    // Логин в Docker Hub и пуш образа
                    sh '''
                    echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                    docker push ${IMAGE_NAME}
                    '''
                }
            }
        }
    }


        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Выполнение команды для перезапуска Deployment в Kubernetes
                    sh '''
                    export KUBECONFIG=${KUBECONFIG}
                    kubectl rollout restart deployment/sicst-front
                    '''
                }
            }
        }
    }

    post {
        always {
            // Очистка рабочего пространства после выполнения
            cleanWs()
        }
    }
}
