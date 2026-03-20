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
                // This command runs ONLY the e2eFlow.spec.js file
                bat 'npx playwright test EASAApplicationProcess/tests/e2eFlow.spec.js --reporter=line,allure-playwright'
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat 'npx allure generate allure-results --clean -o allure-report'
            }
        }
    }

    post {
        always {
            // Publish Allure Report
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])

            // Publish Playwright HTML Report
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])

            // Archive artifacts for debugging
            archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
    }
}