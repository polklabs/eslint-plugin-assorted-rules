import { RuleTester } from "@typescript-eslint/utils/dist/ts-eslint";
import rule, { MessageIds, RULE_NAME } from "../../src/rules/switch-default";

const ruleTester: RuleTester = new RuleTester({
    parser: require.resolve("@typescript-eslint/parser"),
});

const validStatements = [
    `
    function test() {
        const a = 1;
        switch(a) {
            case 1:
                break;
            case 2:
                break;
            default:
                break;
        }
    }
    `,
    `
    function test() {
        const a = 'a';
        switch(a) {
            case 'a':
            case 'b':
            default:
                break;
        }
    }
    `
];
const invalidStatemets = [
    `
    function test() {
        const a = 1;
        switch(a) {
            case 1:
            case 2:
                break;
        }
    }
    `,
    `
    function test() {
        const a = 1;
        switch(a) {
            case 1:
                break;
            case 2:
                break;
        }
    }
    `,
    `
    function test() {
        const a = 'a';
        switch(a) {
            case 'a':
                break;
            case 'b':
                break;
        }
    }
    `,
];

const messageId: MessageIds = "switchDefaultRequired";

ruleTester.run(RULE_NAME, rule, {
    valid: validStatements,
    invalid: [
        { code: invalidStatemets[0], errors: [{ messageId }] },
        { code: invalidStatemets[1], errors: [{ messageId }] },
        { code: invalidStatemets[2], errors: [{ messageId }] },
    ],
});
