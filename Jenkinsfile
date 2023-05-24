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
        script {
          app = docker.build("final-project-docker-images:${env.BUILD_NUMBER}")
        }
      }
    }

    stage ('Remove previous image') {
      steps {
        sh 'docker rmi -f $(docker images -q)'
      }
    }
  }
}