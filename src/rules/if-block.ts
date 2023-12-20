import type { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { createEslintRule } from "../utils/create-eslint-rule";
import { ANY_IF_STATEMENT } from "../utils/selectors";
import * as utils from "../utils/utils";

export const RULE_NAME = "if-block";
export type MessageIds = "ifBlockRequired";
export type Options = [];

export default createEslintRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: 'All "if" statements must use braces',
            recommended: "warn",
        },
        schema: [],
        messages: {
            ifBlockRequired: 'The "if" statement should not omit braces "{}"',
        },
        hasSuggestions: true,
    },
    defaultOptions: [],
    create: (context: Readonly<RuleContext<MessageIds, Options>>) => {
        return {
            [ANY_IF_STATEMENT](node: TSESTree.IfStatement) {
                if (
                    (node.alternate &&
                        utils.isExpressionStatement(node.alternate)) ||
                    utils.isExpressionStatement(node.consequent)
                ) {
                    context.report({
                        messageId: "ifBlockRequired",
                        loc: node.loc,
                    });
                }
            },
        };
    },
});
