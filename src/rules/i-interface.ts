import type { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { createEslintRule } from "../utils/create-eslint-rule";
import { ANY_INTERFACE } from "../utils/selectors";

export const RULE_NAME = "i-interface";
export type MessageIds = "iInterfaceRequired";
export type Options = [];

export default createEslintRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: 'All interfaces names must start with an I',
            recommended: "warn",
        },
        schema: [],
        messages: {
            iInterfaceRequired: 'The interface name should start with \'I\'',
        },
        hasSuggestions: true,
    },
    defaultOptions: [],
    create: (context: Readonly<RuleContext<MessageIds, Options>>) => {
        return {
            [ANY_INTERFACE](node: TSESTree.TSInterfaceDeclaration) {
                const name = node.id.name;
                if (name.length < 2 || name[0] !== 'I' || name[1].toUpperCase() !== name[1]) {
                    context.report({
                        messageId: "iInterfaceRequired",
                        node: node.id,
                    });
                }
            },
        };
    },
});
