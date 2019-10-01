netlify-deploy-preview: clear-cache prepare-tools validate test prepare-content build prepare-functions
netlify-production: clear-cache prepare-tools validate test prepare-content build prepare-functions

.PHONY: clear-cache
clear-cache:
	make -C "./tools/content-loader" clear-cache

.PHONY: prepare-tools
prepare-tools:
	make -C "./tools/content-loader" resolve

.PHONY: validate
validate:
	npm run conflict-check
	npm run lint-check
	npm run markdownlint
	# npm run type-check

.PHONY: test
test:
	npm run test

.PHONY: prepare-content
prepare-content:
	./scripts/prepare-content.sh

.PHONY: build
build:
	npm run build:prod

.PHONY: prepare-functions
prepare-functions:
	npm run build:functions