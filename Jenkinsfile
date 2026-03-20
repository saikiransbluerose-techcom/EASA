pipeline {
    agent any

    environment {
        // Hardcoded Environment Variables
        ESA_USERNAME = 'TestAutomationUser'
        ESA_PASSWORD = 'Rules@1234'
        ESA_VARIANT  = 'V1'
        BASE_URL     = 'https://easa-easaux-dt1.pegacloud.net/prweb/PRAuth/app/OrgApproval/'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Clean install to ensure environment is fresh
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Specific E2E Test') {
            steps {
                // UPDATED PATH: Based on your dir command
                bat 'npx playwright test EASAAutomationWorkFlows/tests/e2eFlow.spec.js --reporter=line,html'
            }
        }
    }

    post {
        always {
            // Publish Playwright HTML Report (Standard)
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])

            // Archive artifacts for manual download if needed
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
        
        success {
            echo 'Test passed successfully!'
        }
        
        failure {
            echo 'Test failed. Please check the Playwright HTML Report in Jenkins.'
        }
    }
}
