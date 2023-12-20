import type { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { createEslintRule } from "../utils/create-eslint-rule";
import { ANY_FOR_STATEMENT } from "../utils/selectors";
import * as utils from "../utils/utils";

export const RULE_NAME = "for-block";
export type MessageIds = "forBlockRequired";
export type Options = [];

export default createEslintRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: 'All "for" statements must use braces',
            recommended: "warn",
        },
        schema: [],
        messages: {
            forBlockRequired: 'The "for" statement should not omit braces "{}"',
        },
        hasSuggestions: true,
    },
    defaultOptions: [],
    create: (context: Readonly<RuleContext<MessageIds, Options>>) => {
        return {
            [ANY_FOR_STATEMENT](node: TSESTree.ForStatement) {
                if (!utils.isBlockStatement(node.body)) {
                    context.report({
                        messageId: "forBlockRequired",
                        loc: node.loc,
                    });
                }
            },
        };
    },
});
