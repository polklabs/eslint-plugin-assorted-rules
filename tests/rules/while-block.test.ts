import { RuleTester } from "@typescript-eslint/utils/dist/ts-eslint";
import rule, { MessageIds, RULE_NAME } from "../../src/rules/while-block";

const ruleTester: RuleTester = new RuleTester({
    parser: require.resolve("@typescript-eslint/parser"),
});

const validStatements = [
    `
    function x() {
        let a = 0
        while(a===0) {
            a++;
        }
    }
    `,
    `
    function x() {
        let a = 0;
        while(true) {
            a++;
        }
    }
    `
];
const invalidStatemets = [
    `
    function x() {
        let a = 0
        while(a===0)
            a++;
    }
    `,
    `
    function x() {
        let a = 0;
        while(true) a++;
    }
    `,
];

const messageId: MessageIds = "whileBlockRequired";

ruleTester.run(RULE_NAME, rule, {
    valid: validStatements,
    invalid: [
        { code: invalidStatemets[0], errors: [{ messageId }] },
        { code: invalidStatemets[1], errors: [{ messageId }] },
    ],
});
