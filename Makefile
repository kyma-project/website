.PHONY: 
	netlify-deploy-preview 
	netlify-production 
	netlify-docs-preview 
	netlify-community-preview 
	clear-cache
	resolve
	validate 
	test 
	prepare-content-website 
	prepare-content-docs-preview 
	prepare-content-community-preview 
	build
	prepare-functions

netlify-deploy-preview: clear-cache validate test prepare-content-website build prepare-functions
netlify-production: clear-cache prepare-content-website build prepare-functions
netlify-docs-preview: clear-cache resolve prepare-content-docs-preview build
netlify-community-preview: clear-cache resolve prepare-content-community-preview build

clear-cache:
	make -C "./tools/content-loader" clear-cache

resolve:
	npm install

validate:
	npm run conflict-check
	npm run lint-check
	npm run markdownlint
	npm run type-check

test:
	npm run test

prepare-content-website:
	./scripts/prepare-content.sh --prepare-for "website"

prepare-content-docs-preview:
ifdef PREVIEW_SOURCE_DIR
	./scripts/prepare-content.sh --prepare-for "docs-preview" --docs-src-dir $(PREVIEW_SOURCE_DIR) --docs-branches "preview"
else
	@echo "PREVIEW_SOURCE_DIR is not a recognized env!"
endif

prepare-content-community-preview:
ifdef PREVIEW_SOURCE_DIR
	./scripts/prepare-content.sh --prepare-for "community-preview" --community-src-dir $(PREVIEW_SOURCE_DIR)
else
	@echo "PREVIEW_SOURCE_DIR is not a recognized env!"
endif

build:
	npm run build:prod

prepare-functions:
	npm run build:functions
