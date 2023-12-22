import type { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { createEslintRule } from "../utils/create-eslint-rule";
import { ANY_SWITCH_STATEMENT } from "../utils/selectors";

export const RULE_NAME = "switch-default";
export type MessageIds = "switchDefaultRequired";
export type Options = [];

export default createEslintRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "All switch statements must include a default case",
            recommended: "warn",
        },
        schema: [],
        messages: {
            switchDefaultRequired: "The switch should include a default case",
        },
        hasSuggestions: true,
    },
    defaultOptions: [],
    create: (context: Readonly<RuleContext<MessageIds, Options>>) => {
        return {
            [ANY_SWITCH_STATEMENT](node: TSESTree.SwitchStatement) {
                const defaultCase = node.cases.find((x) => x.test === null);
                if (defaultCase === undefined) {
                    const { start } = node.loc;
                    const issueLocation = {
                        start,
                        end: {
                            line: start.line,
                            column: start.column + 6, // Highlight the opening 'switch'
                        },
                    };
                    context.report({
                        messageId: "switchDefaultRequired",
                        loc: issueLocation
                    });
                }
            },
        };
    },
});
