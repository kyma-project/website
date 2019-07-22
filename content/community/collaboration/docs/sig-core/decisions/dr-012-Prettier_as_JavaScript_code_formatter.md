# DR 012: Prettier as a JavaScript code formatter

Created on 2018-03-15 by Kamil Kupczyński (@y-kkamil).

## Context

The Code Style Guide is a set of conventions on how to write the source code. It covers many areas, including the use of `camelCase` vs `PascalCase` for variable identifiers, whether or not to use a semicolon as a statement terminator, or the use of tabs or spaces for indentation.

It is obvious that an enforced, unified code style in a project is beneficial. Not only does it improve the readability, but it also saves you from a lot of noise while looking at diffs, caused by unadjusted whitespaces, different break line settings, and other issues. It also ends discussions around the style itself. Once applied, everyone can write code the way they want, and let the formatter do the work. In the end, it saves time and energy.

[Prettier](https://prettier.io) is one of the solutions dedicated to code formatting. It does not enforce such code quality rules as the use of globally scoped variables or naming. It only enforces the formatting rules. It can be used as a plugin for selected IDEs, as a pre-commit `git` hook, or as a standalone CLI tool. No matter which option you choose, it produces the same output given its configuration.

It was chosen because of its simplicity, ease of configuration, small amount of available options, and support for JavaScript, TypeScript, GraphQL, CSS, SCSS, and JSON, all of which are used in Kyma projects.

## Decision

The decision is to use Prettier as the only code formatter for JavaScript-based projects.

## Status

Accepted on 2018-03-15.

## Consequences

Every team working on a JavaScript-based project within Kyma has to incorporate Prettier into their workflow to ensure that the codebase is clean and unified across all projects.
