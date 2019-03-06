ci-pr: resolve validate build
ci-master: resolve validate prepare-git publish-website
ci-release: resolve validate prepare-git publish-website

resolve:
	npm install

validate:
	npm run lint-check
	
build:
	npm run build:prod

prepare-git:
	git remote add origin git@github.com:kyma-project/website.git
	git config user.email "$(BOT_GITHUB_EMAIL)"
	git config user.name "$(BOT_GITHUB_NAME)"

prepare-content: prepare-git
	./scripts/prepare-content.sh --publish --branch $(PULL_BASE_REF) --commit $(PULL_BASE_SHA)

publish-website:
	./scripts/publish-website.sh
	