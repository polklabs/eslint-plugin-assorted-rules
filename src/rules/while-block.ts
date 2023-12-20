import type { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { createEslintRule } from "../utils/create-eslint-rule";
import { ANY_WHILE_STATEMENT } from "../utils/selectors";
import * as utils from "../utils/utils";

export const RULE_NAME = "while-block";
export type MessageIds = "whileBlockRequired";
export type Options = [];

export default createEslintRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: 'All "while" statements must use braces',
            recommended: "warn",
        },
        schema: [],
        messages: {
            whileBlockRequired:
                'The "while" statement should not omit braces "{}"',
        },
        hasSuggestions: true,
    },
    defaultOptions: [],
    create: (context: Readonly<RuleContext<MessageIds, Options>>) => {
        return {
            [ANY_WHILE_STATEMENT](node: TSESTree.WhileStatement) {
                if (!utils.isBlockStatement(node.body)) {
                    context.report({
                        messageId: "whileBlockRequired",
                        loc: node.loc,
                    });
                }
            },
        };
    },
});
