# Overview

To contribute to this project, follow the rules from the general [CONTRIBUTING.md](https://github.com/kyma-project/community/blob/master/CONTRIBUTING.md) document in the `community` repository.
For additional, project-specific guidelines, see the respective sections of this document.

## Contribution rules

Before you make a pull request, review the following rules.

### Implementation guidelines

Follow these rules while you develop new features for this project.

### Naming guidelines

// write anything about naming variables? like constants THIS_WAY and variables in camelCase

### Code quality

- All Go code must have unit and acceptance tests for all business logic.
- All Go code must pass `go vet ./...`. The CI build job performs the check automatically.
- Format the Go code with `gofmt`.
- Describe any new application configuration options in the [README.md](./README.md) document.

?
