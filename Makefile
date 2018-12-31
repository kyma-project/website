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

generate-docs: prepare-git
	./scripts/generate-docs.sh --publish

prepare-website:
	./scripts/prepare-website.sh
	