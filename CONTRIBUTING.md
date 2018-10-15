## Overview

To contribute to this project, follow the rules from the general [CONTRIBUTING.md](https://github.com/kyma-project/community/blob/master/CONTRIBUTING.md) document in the `community` repository.
For additional, project-specific guidelines, see the respective sections of this document.

## Implementation guidelines

Global `CSS` rules are stored in a [global.css](./static/global.css) file. You do not need to explicitly import it to apply them, but use [styled-components](https://www.styled-components.com/) with the color schema defined in [this](./src/config/colors.js) file to define new components.

## Naming guidelines

Name variables using the `camelCase` convention.

## Code quality

Describe any new application configuration options in the [README.md](./README.md) document.
