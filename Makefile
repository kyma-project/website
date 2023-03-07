.PHONY: netlify-deploy-preview \
	netlify-production \
	netlify-docs-preview \
	clear-cache \
	resolve \
	validate \
	test \
	prepare-content-website \
	prepare-content-docs-preview \
	build-prod \
	build-website-preview \
	build-docs-preview \
	prepare-functions

netlify-production: clear-cache prepare-content-website build-prod prepare-functions
netlify-deploy-preview: clear-cache prepare-content-website validate test build-website-preview prepare-functions
netlify-docs-preview: clear-cache resolve prepare-content-docs-preview build-docs-preview

clear-cache:
	make -C "./tools/content-loader" clear-cache

resolve:
	npm install

validate:
	npm run conflict-check
	npm run lint-check
	npm run type-check
	npm run markdownlint

test:
	npm run test

prepare-content-website:
	./scripts/prepare-content.sh --prepare-for "website"

build-prod:
	npm run build:prod

build-website-preview:
	npm run build:preview

build-docs-preview:
	npm run build:preview:docs

prepare-functions:
	npm run build:functions 
