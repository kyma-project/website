IMG_NAME = website-content-loader
IMG = $(DOCKER_PUSH_REPOSITORY)$(DOCKER_PUSH_DIRECTORY)/$(IMG_NAME)
TAG = $(DOCKER_TAG)

ci-pr: resolve validate build-image push-image
ci-master: resolve validate build-image push-image
ci-release: resolve validate build-image push-image

resolve:
	npm install --no-optional

validate:
	npm run conflict-check
	npm run lint-check

build-image:
	docker build -t $(IMG_NAME) .

push-image:
	docker tag $(IMG_NAME) $(IMG):$(TAG)
	docker push $(IMG):$(TAG)
