LAST_COMMIT_EMAIL= $(shell git log -1 --pretty=format:'%ae')
ifeq ($(LAST_COMMIT_EMAIL),'kyma.bot@sap.com')
	SKIP = 'true'
else
	SKIP = 'false'
endif

ci-pr: resolve build
ci-master: resolve generate-docs prepare-website
ci-release: resolve generate-docs prepare-website

resolve:
	npm install

validate:
	eslint -c .eslinterrc ./src
	
build:
	npm run build:prod

generate-docs:
	./scripts/generate-docs.sh --publish --ssh-file $(BOT_GITHUB_SSH_PATH) --skip=$(SKIP)
	
prepare-website:
	./scripts/prepare-website.sh --ssh-file $(BOT_GITHUB_SSH_PATH) --skip=$(SKIP) --overwrite-git-config
	