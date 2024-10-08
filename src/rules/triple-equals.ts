import { type TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { createEslintRule } from "../utils/create-eslint-rule";
import { ANY_BINARY_EXPRESSION } from "../utils/selectors";
import * as utils from "../utils/utils";

export const RULE_NAME = "triple-equals";
export type MessageIds = "tripleEqualsRequired";
export type Options = [];

export default createEslintRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "All equal comparisons must use ===",
            recommended: "warn",
        },
        schema: [],
        messages: {
            tripleEqualsRequired: 'The "==" should be "==="',
        },
        hasSuggestions: true,
    },
    defaultOptions: [],
    create: (context: Readonly<RuleContext<MessageIds, Options>>) => {
        return {
            [ANY_BINARY_EXPRESSION](node: TSESTree.BinaryExpression) {
                if (utils.isBinaryExpression(node)) {
                    if (node.operator === "==") {
                        context.report({
                            messageId: "tripleEqualsRequired",
                            loc: node.loc,
                        });
                    } else {
                        // continue
                    }
                } else {
                    // continue
                }
            },
        };
    },
});
