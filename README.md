# eslint-plugin-assorted-rules
An assortment of linting rules for typescript and angular

[![Unit Tests](https://github.com/polklabs/eslint-plugin-assorted-rules/actions/workflows/node.js.yml/badge.svg)](https://github.com/polklabs/eslint-plugin-assorted-rules/actions/workflows/node.js.yml)

# Installation
```bash
npm i --save-dev eslint eslint-plugin-assorted-rules
```

**Note:** If you installed ESLint globally then you must also install eslint-plugin-assorted-rules globally.

# Usage
Add `assorted-rules` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": ["assorted-rules"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "assorted-rules/if-else": "warn"
  }
}
```

# Rules

| Name              | Description                      | Status |
| :---------------- | :------------------------------- | :----- |
| [if-else](docs/rules/if-else.md)           | Enforce every `if` has an `else` | ✅ |
| [if-block](docs/rules/if-block.md)         | Enforce all `if` statements have curly braces | ✅ |
| [while-block](docs/rules/while-block.md) | Enforce all `while` statements have curly braces | ✅ |
| [for-block](docs/rules/for-block.md) | Enforce all `for` statements have curly braces | ✅ |
| [switch-default](docs/rules/switch-default.md) | Enforce `switch` statements have a `default` case| ✅ |
| [i-interface](docs/rules/i-interface.md) | Enforce all `interface` names start with 'I' | ✅ | 
| file-lint-disable | Don't allow disabling linting rules for entire file | ❓ |
| jsdoc-required | Enforce jsdoc comments for all methods | ❓ |

✅ Complete

🔧 In Progress

❓ Check if possible


##
# Publishing (developer only)

```bash
npm run build
```
```bash
npm run publish
```
