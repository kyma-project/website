.PHONY: netlify-deploy-preview \
	netlify-production \
	netlify-docs-preview \
	netlify-community-preview \
	clear-cache \
	resolve \
	validate \
	test \
	prepare-content-website \
	prepare-content-docs-preview \
	prepare-content-community-preview \
	build-prod \
	build-website-preview \
	build-docs-preview \
	build-community-preview \
	prepare-functions

netlify-production: clear-cache prepare-content-website build-prod prepare-functions
netlify-deploy-preview: validate test build-website-preview
netlify-docs-preview: resolve prepare-content-docs-preview build-docs-preview
netlify-community-preview: resolve prepare-content-community-preview build-community-preview

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

prepare-content-docs-preview:
ifdef PREVIEW_SOURCE_DIR
	./scripts/prepare-content.sh --prepare-for "docs-preview" --docs-src-dir $(PREVIEW_SOURCE_DIR) --docs-branches "preview"
else
	@echo "PREVIEW_SOURCE_DIR is a required env!"
endif

prepare-content-community-preview:
ifdef PREVIEW_SOURCE_DIR
	./scripts/prepare-content.sh --prepare-for "community-preview" --community-src-dir $(PREVIEW_SOURCE_DIR)
else
	@echo "PREVIEW_SOURCE_DIR is a required env!"
endif

build-prod:
	npm run build:prod

build-website-preview:
	npm run build:preview

build-docs-preview:
	npm run build:preview:docs

build-community-preview:
	npm run build:preview:community

prepare-functions:
	npm run build:functions 
