import { RuleTester } from "@typescript-eslint/utils/dist/ts-eslint";
import rule, { MessageIds, RULE_NAME } from "../../src/rules/i-interface";

const ruleTester: RuleTester = new RuleTester({
    parser: require.resolve("@typescript-eslint/parser"),
});

const validStatements = [
    `
    export interface IForm {
        id: string;
    }
    `,
    `
    export interface IEntityObject {
        id: string;
    }
    `
];
const invalidStatemets = [
    `
    export interface Form {
        id: string
    }
    `,
    `
    export interface iForm {
        id: string;
    }
    `,
    `
    export interface Iform {
        id: string;
    }
    `,
    `
    export interface iform {
        id: string;
    }
    `,
];

const messageId: MessageIds = "iInterfaceRequired";

ruleTester.run(RULE_NAME, rule, {
    valid: validStatements,
    invalid: [
        { code: invalidStatemets[0], errors: [{ messageId }] },
        { code: invalidStatemets[1], errors: [{ messageId }] },
        { code: invalidStatemets[2], errors: [{ messageId }] },
        { code: invalidStatemets[3], errors: [{ messageId }] },
    ],
});
