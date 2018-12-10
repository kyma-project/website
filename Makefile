LAST_COMMIT_EMAIL= $(shell git log -1 --pretty=format:'%ae')
ifeq ($(LAST_COMMIT_EMAIL),$(BOT_GITHUB_EMAIL))
	SKIP = 'true'
else
	SKIP = 'false'
endif

ci-pr: resolve build
ci-master: resolve prepare-git generate-docs prepare-website
ci-release: resolve prepare-git generate-docs prepare-website

resolve:
	npm install

validate:
	eslint -c .eslinterrc ./src

build:
	npm run build:prod

prepare-git:
	cp ${BOT_GITHUB_SSH_PATH} $(HOME)/ssh_key.pem
	./scripts/helpers/git-config.sh --ssh-file $(HOME)/ssh_key.pem

generate-docs:
	./scripts/generate-docs.sh --publish --skip $(SKIP)
	
prepare-website:
	./scripts/prepare-website.sh --skip $(SKIP)
	