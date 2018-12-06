LAST_COMMIT_EMAIL= $(shell git log -1 --pretty=format:'%ae')
ifeq ($(LAST_COMMIT_EMAIL),'kyma.bot@sap.com')
	SKIP = 'true'
else
	SKIP = 'false'
endif

ci-pr: resolve build prepare-ssh generate-docs prepare-website
ci-master: resolve prepare-ssh generate-docs prepare-website
ci-release: resolve prepare-ssh generate-docs prepare-website

resolve:
	npm install

validate:
	eslint -c .eslinterrc ./src

build:
	npm run build:prod

prepare-ssh:
	cp ${BOT_GITHUB_SSH_PATH} ssh_key.pem

generate-docs:
	./scripts/generate-docs.sh --publish --ssh-file ./ssh_key.pem --skip $(SKIP) --overwrite-git-config
	
prepare-website:
	./scripts/prepare-website.sh --ssh-file ./ssh_key.pem --skip $(SKIP) --overwrite-git-config
	