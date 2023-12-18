import type { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
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
                "All \"if\" statements must have a corresponding \"else\" statement",
            recommended: "warn",
        },
        schema: [],
        messages: {
            ifElseRequired:
                "The \"if\" statement should include a corresponding \"else\" statement",
        },
    },
    defaultOptions: [],
    create: (context: Readonly<RuleContext<MessageIds, Options>>) => {
        return {
            [ANY_IF_STATEMENT](node: TSESTree.IfStatement) {
                if (node.parent && utils.isIfStatement(node.parent)) {
                    return;
                } else {
                    // Not an "else if", continue
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
                } else {
                    // Continue to reporting issue
                }

                const { start } = node.loc;
                const issueLocation = {
                    start,
                    end: {
                        line: start.line,
                        column: start.column + 2, // Highlight the opening brace
                    },
                };

                context.report({
                    messageId: "ifElseRequired",
                    loc: issueLocation,
                });
            },
        };
    },
});
