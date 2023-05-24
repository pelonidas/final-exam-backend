//Jenkins file only to tutorial example
pipeline {
  agent any
  
   environment {
        PATH = "$PATH:/usr/local/bin"
  }

  tools {nodejs "NodeJs"}
    
  stages {
        
    stage('Cloning Git') {
      steps {
        git branch: 'main', url: 'https://github.com/pelonidas/final-exam-backend.git'
     }
  
    }
        
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
     
    stage('Test') {
      steps {
         sh 'npm run test:e2e'
         sh 'docker rm -f postgresql-container'
      }
    }

    stage ('Build Docker Image') {
      steps {
        sh 'docker build -t final-exam-backend .'
        sh 'docker tag final-exam-backend 433332299350.dkr.ecr.eu-north-1.amazonaws.com/final-project-docker-images'
      }
    }

    stage ('Push to ECR') {
      steps {
        sh 'docker login -u AWS -p $(aws ecr get-login-password --region eu-north-1) 433332299350.dkr.ecr.eu-north-1.amazonaws.com'
        sh 'docker push 433332299350.dkr.ecr.eu-north-1.amazonaws.com/final-project-docker-images'
      }
    }
  }
}