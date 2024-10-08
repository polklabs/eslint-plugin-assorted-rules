import { RuleTester } from "@typescript-eslint/utils/dist/ts-eslint";
import rule, { MessageIds, RULE_NAME } from "../../src/rules/triple-equals";

const ruleTester: RuleTester = new RuleTester({
    parser: require.resolve("@typescript-eslint/parser"),
});

const validStatements = [
    `
    const i = 0;
    const b = i === 1;
    `,
    `
    if(a===0) {
        // Do something
    } else if (a===1) {
        // Do something else
    }
    `,
    `
    const i = 0;
    const b = i !== 1;
    `,
];
const invalidStatements = [
    `
    const i = 0;
    const b = i == 1;
    `,
    `
    if(a==0) {
        // Do something
    } else if (a===1) {
        // Do something else
    }
    `,
    `
    const i = 0;
    const b = i != 1;
    `,
];

const messageId: MessageIds = "tripleEqualsRequired";
const messageNotId: MessageIds = "tripleNotEqualsRequired";

ruleTester.run(RULE_NAME, rule, {
    valid: validStatements,
    invalid: [
        { code: invalidStatements[0], errors: [{ messageId }] },
        { code: invalidStatements[1], errors: [{ messageId }] },
        { code: invalidStatements[2], errors: [{ messageId: messageNotId }] },
    ],
});
