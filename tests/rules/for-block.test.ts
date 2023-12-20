import { RuleTester } from "@typescript-eslint/utils/dist/ts-eslint";
import rule, { MessageIds, RULE_NAME } from "../../src/rules/for-block";

const ruleTester: RuleTester = new RuleTester({
    parser: require.resolve("@typescript-eslint/parser"),
});

const validStatements = [
    `
    function x() {
        let a = 0
        for(let i = 0; i < 12; i++) {
            a++;
        }
    }
    `,
    `
    function x() {
        let a = [3,1,4,1,5,9];
        for (let item of a) {
            console.log(item);
        }
    }
    `
];
const invalidStatemets = [
    `
    function x() {
        let a = 0
        for(let i = 0; i < 12; i++)
            a++;
    }
    `,
    `
    function x() {
        let a = [3,1,4,1,5,9];
        for (let item of a) console.log(item);
    }
    `,
];

const messageId: MessageIds = "forBlockRequired";

ruleTester.run(RULE_NAME, rule, {
    valid: validStatements,
    invalid: [
        { code: invalidStatemets[0], errors: [{ messageId }] },
        { code: invalidStatemets[1], errors: [{ messageId }] },
    ],
});
