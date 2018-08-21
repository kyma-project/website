#!/usr/bin/env groovy
def label = "kyma-${UUID.randomUUID().toString()}"
def application = 'website'
def isMaster = params.GIT_BRANCH == "master"

echo """
********************************
Job started with the following parameters:
DOCKER_REGISTRY=${env.OPEN_DOCKER_REGISTRY}
GIT_REVISION=${params.GIT_REVISION}
GIT_BRANCH=${params.GIT_BRANCH}
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
                            execute("npm install")
                        }

                        if(isMaster) {
                            stage("prepare ssh for git") {
                                withCredentials([sshUserPrivateKey(credentialsId: "bitbucket-rw", keyFileVariable: 'sshfile')]) {
                                    sh "cp ${sshfile} ssh_key.pem"
                                }
                            }

                            if(params.DOCS_VERSION) {
                                stage("prepare docs and navigation") {
                                    withCredentials([sshUserPrivateKey(credentialsId: "bitbucket-rw", keyFileVariable: 'sshfile')]) {
                                        execute("./prepare-docs.sh -s ${sshfile} -v ${params.DOCS_VERSION}")
                                    }
                                }
                            }

                            stage("push new version of $application") {
                                execute("./prepare-website.sh")
                            }
                        } else {
                            execute("npm run build")
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
    def buildpack = 'node-buildpack:0.0.9'
    def envText = ''
    for (it in envs) {
        envText = "$envText --env $it"
    }
    workDir = pwd()
    sh "docker run --rm -v $workDir:/$repositoryName -w /$repositoryName $envText ${env.DOCKER_REGISTRY}$buildpack /bin/bash -c '$command'"
}