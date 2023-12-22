import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { createEslintRule } from "../utils/create-eslint-rule";

export const RULE_NAME = "file-lint-disable";
export type MessageIds = "fileLintDisableRequired";
export type Options = [];

// The 'X?' is used so I can run tests without Jest complaining about disabling non-existent eslint rules
const regex = /\/\*\seslint-disableX?\s.+?\s\*\//gms;

export default createEslintRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "Do not disable linting rules for the entire file",
            recommended: "warn",
        },
        schema: [],
        messages: {
            fileLintDisableRequired:
                "The lint rule should not be disabled for the entire file",
        },
        hasSuggestions: true,
    },
    defaultOptions: [],
    create: (context: Readonly<RuleContext<MessageIds, Options>>) => {
        return {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Program(node) {
                const file = context.getSourceCode().getText();

                let m;
                while ((m = regex.exec(file)) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (m.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    const issueLocation = {
                        start: getLineColumn(file, m.index),
                        end: getLineColumn(file, m.index + m[0].length),
                    };
                    context.report({
                        messageId: "fileLintDisableRequired",
                        loc: issueLocation,
                    });
                }
            },
        };
    },
});

function getLineColumn(
    text: string,
    index: number
): { line: number; column: number } {
    const lines = text.substring(0, index).split("\n");
    const lineNumber = lines.length;
    const columnNumber = lines[lines.length - 1].length + 1; // Adding 1 for the newline character

    return { line: lineNumber, column: columnNumber };
}
