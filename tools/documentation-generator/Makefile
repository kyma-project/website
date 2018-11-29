IMG_NAME = documentation-generator
IMG = $(DOCKER_PUSH_REPOSITORY)$(DOCKER_PUSH_DIRECTORY)/$(IMG_NAME)
TAG = $(DOCKER_TAG)

ci-pr: resolve build-image push-image
ci-master: resolve build-image push-image
ci-release: resolve build-image push-image

resolve:
	npm install --no-optional
	
validate:
	eslint -c .eslinterrc ./src

build-image:
	docker build -t $(IMG_NAME) .

push-image:
	docker tag $(IMG_NAME) $(IMG):$(TAG)
	docker push $(IMG):$(TAG)
