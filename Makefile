ci-pr: resolve build
ci-master: resolve prepare-git prepare-website
ci-release: resolve prepare-git prepare-website

resolve:
	npm install

validate:
	eslint -c .eslinterrc ./src

build:
	npm run build:prod

prepare-git:
	git remote add origin git@github.com:kyma-project/website.git
	git config user.email "$(BOT_GITHUB_EMAIL)"
	git config user.name "$(BOT_GITHUB_NAME)"

generate-docs: prepare-git
	./scripts/generate-docs.sh --publish --branch $(PULL_BASE_REF) --commit $(PULL_BASE_SHA)

prepare-website:
	./scripts/prepare-website.sh
	