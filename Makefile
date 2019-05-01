netlify-master: validate build prepare-functions

validate:
	npm run conflict-check
	npm run lint-check
	npm run markdownlint

prepare-functions:
	npm run build:functions

prepare-content:
	./scripts/prepare-content.sh
	
build:
	npm run build:prod
