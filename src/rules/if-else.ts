import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { TSESTree } from "@typescript-eslint/utils/dist/ts-estree";
import { createEslintRule } from "../utils/create-eslint-rule";
import { ANY_IF_STATEMENT } from "../utils/selectors";
import * as utils from "../utils/utils";

export const RULE_NAME = "if-else";
export type MessageIds = "ifElseRequired";
export type Options = [];

export default createEslintRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description:
                "All if statements must have a corresponding else statement",
        },
        schema: [],
        messages: {
            ifElseRequired:
                "The if statement should include a corresponding else statement",
        },
    },
    defaultOptions: [],
    create: (context: Readonly<RuleContext<MessageIds, Options>>) => {
        return {
            [ANY_IF_STATEMENT](node: TSESTree.IfStatement) {
                if (node.parent && utils.isIfStatement(node.parent)) {
                    return;
                }

                let alternate = node.alternate;
                let count = 0;
                while (alternate && utils.isIfStatement(alternate)) {
                    alternate = alternate.alternate;

                    // Prevent infinite loops
                    count++;
                    if (count > 100) {
                        return;
                    }
                }

                if (alternate) {
                    return;
                }

                context.report({
                    messageId: "ifElseRequired",
                    loc: node.loc,
                });
            },
        };
    },
});
