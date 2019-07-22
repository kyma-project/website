# Create a common validator for Kyma

Created on 2019-01-10 by Michał Hudy (@michal-hudy).

## Status

Proposed on 2019-01-15.

## Motivation

The Kyma project is one big monorepository with multiple separate projects. Those projects are validated in different ways. The current situation results in the following issues:

- The script that validates repositories is duplicated across components.
- There are multiple versions of the script that validates components.
- It is not possible to maintain it.
- Contributors don't know what they should execute to validate a component.
- There are different formatting and coding standards for Kyma components.
- The CI validates the code in a different environment than the one in which it is validated locally.

## Solution

The `kyma-project` organization on GitHub already contains makefiles in every repository and the CI pipeline is based on them. That is why, we should unify makefile targets across components and repositories, and resign from other solutions, such as before-commit, or custom validators. Thanks to that, whenever contributors work on a Kyma component or any other tool in our organization, they will know how to execute builds, tests, or how to format the code. It is crucial for the development experience.

This proposal is based on the `ui-api-layer` component. Since it is only an example, the presented targets may not be fully functional.

### Makefile targets

The makefile targets should be simple and allow contributors to execute all required validations as one command. It should be unified across all `kyma-project` repositories regardless of language or type.

Currently, the makefiles in components look as follows:

```makefile
APP_NAME = ui-api-layer
IMG = $(DOCKER_PUSH_REPOSITORY)$(DOCKER_PUSH_DIRECTORY)/$(APP_NAME)
TAG = $(DOCKER_TAG)

.PHONY: ci-pr ci-master ci-release resolve build-and-test build-image push-image

ci-pr: resolve build-and-test build-image push-image
ci-master: resolve build-and-test build-image push-image
ci-release: resolve build-and-test build-image push-image

resolve:
	dep ensure -v -vendor-only
build-and-test:
	./before-commit.sh ci
build-image:
	docker build -t $(APP_NAME) .
push-image:
	docker tag $(APP_NAME) $(IMG):$(TAG)
	docker push $(IMG):$(TAG)
```

Only the `ci-*` targets are unified in the `kyma-project` organization because they are required by the CI system. Other targets can have different names because they are not unified and not required by any system. For example, `ui-api-layer` has the `build-and-test` target, while `binding-usage-controller` has `build`. Both targets execute the `before-commit.sh` script. In such a case, the contributor doesn't know how to work with components in one repository.

As a solution to that, I would like to unify these targets:
 - `ci-pr`, `ci-master`, `ci-release` which are required by the CI system
 - `validate` that executes the whole validation
 - `resolve` that downloads dependencies
 - `build` that executes component builds
 - `clean` that removes artifacts
 - `test` that executes tests for a component
 - `lint` that executes linters for a component
 - `format` that executes code formatting for a component
 - `validate-format` that validates if files are formatted correctly
 - `docker-build` that builds the Docker image with a component
 - `docker-push` that pushes the Docker image to a repository

After unification, the makefile for the `ui-api-layer` component will look as follows:

 ```makefile
APP_NAME = ui-api-layer
IMG = $(DOCKER_PUSH_REPOSITORY)$(DOCKER_PUSH_DIRECTORY)/$(APP_NAME)
TAG = $(DOCKER_TAG)

.PHONY: ci-pr ci-master ci-release validate resolve build test format lint build-image push-image

ci-pr: validate build-image push-image
ci-master: ci-pr
ci-release: ci-master

validate: resolve build test format lint

resolve:
	dep ensure -v -vendor-only
build:
	go build -o bin/$(APP_NAME)
clean:
	rm bin/$(APP_NAME)
test:
	go test ./...
format:
	go fmt ./...
validate-format:
	$(eval CHANGED:=$(shell go fmt ./...))
	@test -z "$(CHANGED)" \
	|| (echo "Not formatted files: $(CHANGED)" && exit 1)
lint:
	go vet ./...

docker-build:
	docker build -t $(APP_NAME) .
docker-push:
	docker tag $(APP_NAME) $(IMG):$(TAG)
	docker push $(IMG):$(TAG)
 ```

### Common makefile

If we introduce unified targets, it would be best not to duplicate the makefiles content in other components. Fortunately, it is possible to reference makefiles. Thanks to that, we can create one common makefile that will be included in the components' makefiles.

Let's name this common makefile a `template.go.mk` file and put it in the `kyma/scripts` directory. We can also store other common scripts in `kyma/scripts`.

>**NOTE:** All files in the `.mk` format are treated as makefiles.

The content of the `template.go.mk` file will look as follows:

```makefile
IMG = $(DOCKER_PUSH_REPOSITORY)$(DOCKER_PUSH_DIRECTORY)/$(APP_NAME)
TAG = $(DOCKER_TAG)

.PHONY: ci-pr ci-master ci-release validate resolve build test format lint build-image push-image

ci-pr: validate build-image push-image
ci-master: ci-pr
ci-release: ci-master

validate: resolve build test format lint

resolve:
	dep ensure -v -vendor-only
build:
	go build -o bin/$(APP_NAME)
clean:
	rm bin/$(APP_NAME)
test:
	go test ./...
format:
	go fmt ./...
validate-format:
	$(eval CHANGED:=$(shell go fmt ./...))
	@test -z "$(CHANGED)" \
	|| (echo "Not formatted files: $(CHANGED)" && exit 1)
lint:
	go vet ./...

docker-build:
	docker build -t $(APP_NAME) .
docker-push:
	docker tag $(APP_NAME) $(IMG):$(TAG)
	docker push $(IMG):$(TAG)
```

And `makefile` for `ui-api-layer`:

```makefile
APP_NAME = ui-api-layer
REPOSITORY_PATH = $(realpath $(shell pwd)/../..)

include $(REPOSITORY_PATH)/scripts/template.go.mk
```

Thanks to that change, all targets from `template.go.mk` are available in the makefile for `ui-api-layer`.

Unfortunately, the structure of components can vary and they can be built in different ways. For example, `ui-api-layer` has a `main.go` file at the root of the component, while `binding-usage-controller` has it in the `cmd/controller` directory. The template should handle such a situation, and it is possible thanks to `template definition` and `eval` functions.

After introducing `template definition`, the makefiles will look as follows:

`template.go.mk`:
```makefile
DOCKER_REPOSITORY = $(DOCKER_PUSH_REPOSITORY)$(DOCKER_PUSH_DIRECTORY) # provided by CI system
COMPONENT_REL_PATH=$(shell echo $(shell pwd) | sed 's,$(REPOSITORY_PATH)/,,g')

.PHONY: ci-pr ci-master ci-release resolve validate build clean test format validate-format lint docker-build docker-push

ci-pr: validate build-image push-image
ci-master: ci-pr
ci-release: ci-master

validate: resolve build test validate-format lint clean
resolve:
	dep ensure -v -vendor-only
test:
	go test ./...
format:
	go fmt ./... # may be replaced by goimports
validate-format:
	$(eval CHANGED:=$(shell go fmt ./...))
	@test -z "$(CHANGED)" \
	|| (echo "Not formatted files: $(CHANGED)" && exit 1)
lint:
	go vet ./...

define TARGETS
build:
	go build -o bin/$(APP_NAME) $(1)
clean):
	rm bin/$(APP_NAME)
docker-build:
	docker build -t $(APP_NAME) . --file $(2)
docker-push:
	docker tag $(APP_NAME) $(DOCKER_REPOSITORY)/$(APP_NAME):$(DOCKER_TAG)
	docker push $(DOCKER_REPOSITORY)/$(APP_NAME):$(DOCKER_TAG)
endef
```

`ui-api-layer`:
```makefile
APP_NAME = ui-api-layer
REPOSITORY_PATH = $(realpath $(shell pwd)/../..)

include $(REPOSITORY_PATH)/scripts/template.go.mk

$(eval $(call TARGETS,main.go,Dockerfile))
```

Thanks to `template.go.mk`, we will have one place in a repository with target definitions, and it will be much easier to maintain them.

>**NOTE**: If you make any changes to `template.go.mk`, the CI system needs to validate if all components build successfully.

### Sandbox validation

Developers often work in a different environment than the one used by the CI system. For example, they use different versions of Golang. It is important to provide a way of verifying the code against the CI environment. This can be enabled by creating targets with the `-sandbox` suffix that will execute targets in the same `buildpack` Docker image as the one the CI system uses.

To achieve that, we need to update `template.go.mk` and the makefile for a given component.

`template.go.mk`:
```makefile
DOCKER_REPOSITORY = $(DOCKER_PUSH_REPOSITORY)$(DOCKER_PUSH_DIRECTORY) # provided by the CI system
COMPONENT_REL_PATH=$(shell echo $(shell pwd) | sed 's,$(REPOSITORY_PATH)/,,g')

.PHONY: ci-pr ci-master ci-release resolve validate build clean test format validate-format lint docker-build docker-push

ci-pr: validate build-image push-image
ci-master: ci-pr
ci-release: ci-master

validate: resolve build test validate-format lint clean
resolve:
	dep ensure -v -vendor-only
test:
	go test ./...
format:
	go fmt ./... # may be replaced by goimports
validate-format:
	$(eval CHANGED:=$(shell go fmt ./...))
	@test -z "$(CHANGED)" \
	|| (echo "Not formatted files: $(CHANGED)" && exit 1)
lint:
	go vet ./...

define TARGETS
build:
	go build -o bin/$(APP_NAME) $(1)
clean):
	rm bin/$(APP_NAME)
docker-build:
	docker build -t $(APP_NAME) . --file $(2)
docker-push:
	docker tag $(APP_NAME) $(DOCKER_REPOSITORY)/$(APP_NAME):$(DOCKER_TAG)
	docker push $(DOCKER_REPOSITORY)/$(APP_NAME):$(DOCKER_TAG)
endef

define SANDBOX
.PHONY: $(1)-sandbox
$(1)-sandbox:
	docker run --rm -v "$(REPOSITORY_PATH):/workspace/go/src/github.com/kyma-project/kyma" \
	--workdir "/workspace/go/src/github.com/kyma-project/kyma/$(COMPONENT_REL_PATH)" \
	eu.gcr.io/kyma-project/prow/test-infra/buildpack-golang:$(BUILDPACK_VERSION) \
	make $(1)
endef

$(eval $(call SANDBOX,validate))
$(eval $(call SANDBOX,validate-format))
$(eval $(call SANDBOX,resolve))
$(eval $(call SANDBOX,test))
$(eval $(call SANDBOX,format))
$(eval $(call SANDBOX,lint))
```

To component `Makefile` we need to add `buildpack` version:

```makefile
APP_NAME = ui-api-layer
BUILDPACK_VERSION = v20181119-afd3fbd
REPOSITORY_PATH = $(realpath $(shell pwd)/../..)

include $(REPOSITORY_PATH)/scripts/template.go.mk

$(eval $(call TARGETS,main.go,Dockerfile))
```

### Support for multiple artifacts from one component

Some components, like `event-bus`, generate multiple artifacts during the build. Handling such a situation is also possible, but it will require unification of the component structure. All `main.go` files will need to be located in `cmd/{name}/main.go` and names of Dockerfiles will need to be changed to `{name}.Dockerfile`, or be located in separated directories.

We should investigate if it is easier to introduce one artifact per component or a unified structure of components.

See `template.go.mk` that supports multiple artifacts:

```makefile
DOCKER_REPOSITORY = $(DOCKER_PUSH_REPOSITORY)$(DOCKER_PUSH_DIRECTORY) # provided by CI system
COMPONENT_REL_PATH=$(shell echo $(shell pwd) | sed 's,$(REPOSITORY_PATH)/,,g')

.PHONY: ci-pr ci-master ci-release resolve validate build clean test format validate-format lint docker-build docker-push

ci-pr: validate build-image push-image
ci-master: ci-pr
ci-release: ci-master

validate: resolve build test validate-format lint clean
resolve:
	dep ensure -v -vendor-only
test:
	go test ./...
format:
	go fmt ./... # may be replaced by goimports
validate-format:
	$(eval CHANGED:=$(shell go fmt ./...))
	@test -z "$(CHANGED)" \
	|| (echo "Not formatted files: $(CHANGED)" && exit 1)
lint:
	go vet ./...
build: $(foreach appName,$(APP_NAMES),build-$(appName))
clean: $(foreach appName,$(APP_NAMES),clean-$(appName))
docker-build: $(foreach appName,$(APP_NAMES),docker-build-$(appName))
docker-push: $(foreach appName,$(APP_NAMES),docker-push-$(appName))

define TARGETS
.PHONY: build-$(1) clean-$(1) docker-build-$(1) docker-push-$(1)
build-$(1):
	go build -o bin/$(1) cmd/$(1)
clean-$(1):
	rm bin/$(1)
docker-build-$(1):
	docker build -t $(1) . --file $(1).Dockerfile
docker-push-$(1):
	docker tag $(1) $(DOCKER_REPOSITORY)/$(1):$(DOCKER_TAG)
	docker push $(DOCKER_REPOSITORY)/$(1):$(DOCKER_TAG)
endef

define SANDBOX
.PHONY: $(1)-sandbox
$(1)-sandbox:
	docker run --rm -v "$(REPOSITORY_PATH):/workspace/go/src/github.com/kyma-project/kyma" \
	--workdir "/workspace/go/src/github.com/kyma-project/kyma/$(COMPONENT_REL_PATH)" \
	eu.gcr.io/kyma-project/prow/test-infra/buildpack-golang:$(BUILDPACK_VERSION) \
	make $(1)
endef

$(eval $(call SANDBOX,validate))
$(eval $(call SANDBOX,validate-format))
$(eval $(call SANDBOX,resolve))
$(eval $(call SANDBOX,test))
$(eval $(call SANDBOX,format))
$(eval $(call SANDBOX,lint))
```

See a makefile for a component:
```makefile
APP_NAMES = name1 name2 name3 name4
BUILDPACK_VERSION = v20181119-afd3fbd
REPOSITORY_PATH = $(realpath $(shell pwd)/../..)

include $(REPOSITORY_PATH)/scripts/template.go.mk

$(foreach appName,$(APP_NAMES),$(eval $(call TARGETS,$(appName))))
```

## Summary

To unify our validation and makefile targets, we should define a template that will be included in all component makefiles. This way, we will be able to have one place per repository with target definitions, and it will be easier to introduce new validations.

Such a proposal also introduces a possibility of validating the source code against the CI environment, which can speed up the pull requests creation process. It is possible to support multiple artifacts per components, but we should consider if we still want it.

See these sections for examples:
 - [One artifact per component](#sandbox-validation)
 - [Multiple artifacts per component](#support-for-multiple-artifacts-from-one-component)

The disadvantages of this solution are as follows:
 - The template is defined per repository, not per organization.
 - The `buildpack` version is defined per component and is duplicated in the CI job definition.
 - It is not visible what targets are available in the component makefile because they are generated during execution.
