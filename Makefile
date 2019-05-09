ci-pr: resolve validate build
ci-master: resolve validate prepare-git publish-website
ci-release: resolve validate prepare-git publish-website

resolve:
	npm install

validate:
	npm run conflict-check
	npm run lint-check
	npm run markdownlint
	
build:
	npm run build:prod

prepare-git:
	git remote add origin git@github.com:kyma-project/website.git
	git config user.email "$(BOT_GITHUB_EMAIL)"
	git config user.name "$(BOT_GITHUB_NAME)"

prepare-content:
	echo "Co się nauczyliśmy to nasze"

publish-website: prepare-git
	./scripts/prepare-content.sh
	./scripts/publish-website.sh
	