pipeline {
    agent any
    triggers {
        pollSCM('* * * * *')
      }
    stages{
      stage('Build'){
        steps{
          echo "Building the project2"
        }
      }
      stage('Test'){
        steps{
          echo "Testing project 2"
        }
      }
    }
}