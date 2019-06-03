netlify-deploy-preview: clear-cache increase-file-watchers validate prepare-tools prepare-content build prepare-functions
netlify-production: clear-cache increase-file-watchers validate prepare-tools prepare-content build prepare-functions

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

increase-file-watchers:
	echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p