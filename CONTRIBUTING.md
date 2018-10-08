# Overview

To contribute to this project, follow the rules from the general [CONTRIBUTING.md](https://github.com/kyma-project/community/blob/master/CONTRIBUTING.md) document in the `community` repository.
For additional, project-specific guidelines, see the respective sections of this document.

## Implementation guidelines

### General implementation rules:

Global `CSS` rules are stored in a [global.css](./static/global.css) file, you do not need to import it to apply them, but use [styled-components](https://www.styled-components.com/) with color schema defined in [this](./src/config/colors.js) file for developing new components.

//write anything about GraphQL used by Gatsby? Gatsby is mentioned in very first line in readme, and anyone who contributes to this project would first read gatbsy's docs

## Naming guidelines

Name variables using _`camelCase`_ convention.

## Code quality

- Describe any new application configuration options in the [README.md](./README.md) document.
