pipeline{
    agent any
    triggers {
        pollSCM('* * * * *')
      }
    stages{
      stage('Checkout'){
        steps{
          echo "Checking out the code"
        }
      }
      stage('Build'){
        steps{
          echo "Building the project"
        }
      }
    } 
}