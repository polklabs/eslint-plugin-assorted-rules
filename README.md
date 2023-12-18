# eslint-plugin-assorted-rules
An assortment of linting rules for typescript and angular

# Installation
```bash
npm i --save-dev eslint eslint-plugin-assorted-rules
```

**Note:** If you installed ESLint globally then you must also install eslint-plugin-jest globally.

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

| Name              | Description                      |
| :---------------- | :------------------------------- |
| [if-else](docs/rules/if-else.md)           | Enforce every "if" has an "else" |

##
# Publishing

```bash
npm run build
```
```bash
npm run publish
```