import { ESLintUtils } from "@typescript-eslint/utils/dist/index";

export const createEslintRule = ESLintUtils.RuleCreator((ruleName) => ruleName);
