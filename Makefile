netlify-deploy-preview: validate prepare-tools prepare-content build prepare-functions
netlify-production: validate prepare-tools prepare-content build prepare-functions

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