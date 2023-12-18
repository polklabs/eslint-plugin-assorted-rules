import { ESLintUtils } from "@typescript-eslint/utils/dist";

export const createEslintRule = ESLintUtils.RuleCreator((ruleName) => ruleName);
