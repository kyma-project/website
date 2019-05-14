netlify-deploy-preview: clear-cache validate prepare-tools prepare-content build prepare-functions
netlify-production: clear-cache validate prepare-tools prepare-content build prepare-functions

clear-cache:
	make -C "./tools/content-loader" clear-cache

validate:
	npm run conflict-check
	npm run lint-check
	npm run markdownlint

prepare-tools:
	make -C "./tools/content-loader" resolve

prepare-content:
	./scripts/prepare-content.sh
	
build:
	npm run build:prod

prepare-functions:
	npm run build:functions