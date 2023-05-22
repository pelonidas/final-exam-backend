pipeline {
  agent any
    
  tools {nodejs "NodeJs"}
    
  stages {
    stage('Checkout') {
      steps {
        echo 'Checking outf...'
      }
    } 
    stage('Git') {
      steps {
        git 'https://github.com/pelonidas/final-exam-backend.git'
      }
    }
     
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    } 
            
    stage('Test') {
      steps {
        sh 'npm run test:e2e'
      }
    }
  }
}