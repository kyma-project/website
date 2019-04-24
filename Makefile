ci-pr: resolve validate build
ci-master: resolve validate prepare-git prepare-content
ci-release: resolve validate prepare-git prepare-content

resolve:
	npm install

validate:
	npm run conflict-check
	npm run lint-check
	
build:
	npm run build:prod

prepare-git:
	git remote add origin git@github.com:kyma-project/website.git
	git config user.email "$(BOT_GITHUB_EMAIL)"
	git config user.name "$(BOT_GITHUB_NAME)"

prepare-content: prepare-git
	./scripts/prepare-content.sh --branches $(PULL_BASE_REF)
	./scripts/publish-website.sh
	