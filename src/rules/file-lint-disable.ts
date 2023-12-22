import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { createEslintRule } from "../utils/create-eslint-rule";

export const RULE_NAME = "file-lint-disable";
export type MessageIds = "fileLintDisableRequired";
export type Options = [];

// The 'X?' is used so I can run tests without Jest complaining about disabling non-existent eslint rules
const regex = /\/\* eslint-disableX? .+ \*\//gm;

export default createEslintRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: 'Do not disable linting rules for the entire file',
            recommended: "warn",
        },
        schema: [],
        messages: {
            fileLintDisableRequired:
                'The lint rule should not be disabled for the entire file',
        },
        hasSuggestions: true,
    },
    defaultOptions: [],
    create: (context: Readonly<RuleContext<MessageIds, Options>>) => {
        return {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Program(node) {
                const lines = context.getSourceCode().getLines();
                lines.forEach((line, index) => {
                    if (regex.test(line)) {
                        const issueLocation = {
                            start: {
                                line: index + 1,
                                column: 0,
                            },
                            end: {
                                line: index + 1,
                                column: line.length,
                            },
                        };
                        context.report({
                            messageId: "fileLintDisableRequired",
                            loc: issueLocation,
                        });
                    }
                });
            },
        };
    },
});
