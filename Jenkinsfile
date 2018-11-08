#!/usr/bin/env groovy
def label = "kyma-${UUID.randomUUID().toString()}"
def application = 'website'
def isMaster = params.GIT_BRANCH == "master"

echo """
********************************
Job started with the following parameters:
DOCKER_REGISTRY=${env.DOCKER_REGISTRY}
GIT_REVISION=${params.GIT_REVISION}
GIT_BRANCH=${params.GIT_BRANCH}
APP_VERSION=${params.APP_VERSION}
DOCS_VERSION=${params.DOCS_VERSION}
********************************
"""

podTemplate(label: label) {
    node(label) {
        try {
            timestamps {
                timeout(time:10, unit:"MINUTES") {
                    ansiColor('xterm') {
                        stage("setup") {
                            checkout scm
                        }

                        stage("resolve dependencies $application") {
                            execute("npm install -f")
                        }

                        if(isMaster) {
                            stage("IP scan $application (WhiteSource)") {
                                withCredentials([string(credentialsId: 'whitesource_apikey', variable: 'apikey'), string(credentialsId: 'whitesource_userkey', variable: 'userkey')]) {
                                    execute("make scan", ["API_KEY=$apikey", "USER_KEY=$userkey"])
                                }
                            }

                            stage("prepare ssh key for git config") {
                                withCredentials([sshUserPrivateKey(credentialsId: "bitbucket-rw", keyFileVariable: 'sshfile')]) {
                                    sh "cp ${sshfile} ssh_key.pem"
                                }
                            }

                            stage("generate and publish documentation") {
                                withCredentials([string(credentialsId: 'public-github-token', variable: 'token')]) {
                                    sh "./scripts/generate-docs.sh --publish --ssh-file ./ssh_key.pem --token ${token}"
                                }
                            }

                            stage("push new version of $application") {
                                execute("./scripts/prepare-website.sh -s /website/ssh_key.pem --overwrite-git-config")
                            }
                        } else {
                            stage("build $application") {
                                execute("npm run build")
                            }
                        }
                    }
                }
            }
        } catch (ex) {
            echo "Got exception: ${ex}"
            currentBuild.result = "FAILURE"
            def body = "${currentBuild.currentResult} ${env.JOB_NAME}${env.BUILD_DISPLAY_NAME}: on branch: ${env.BRANCH_NAME}. See details: ${env.BUILD_URL}"
            emailext body: body, recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'CulpritsRecipientProvider'], [$class: 'RequesterRecipientProvider']], subject: "${currentBuild.currentResult}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
        }
    }
}

def execute(command, envs = []) {
    def repositoryName = 'website'
    def buildpack = 'node-buildpack:0.0.10'
    def envText = ''
    for (it in envs) {
        envText = "$envText --env $it"
    }
    workDir = pwd()
    sh "docker run --rm -v $workDir:/$repositoryName -w /$repositoryName $envText ${env.DOCKER_REGISTRY}$buildpack /bin/bash -c '$command'"
}