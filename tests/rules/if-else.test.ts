import { RuleTester } from "@typescript-eslint/utils/dist/ts-eslint";
import rule, { MessageIds, RULE_NAME } from "../../src/rules/if-else";

const ruleTester: RuleTester = new RuleTester({
    parser: require.resolve("@typescript-eslint/parser"),
});

const validStatements = [
    `
    function x() {
        let a = 0
        if(a===0) {
            // Do something
        } else { /*stub*/ }
    }
    `,
    `
    function x() {
        let a = 0
        if(a===0) {
            // Do something
        } else if (a===1) {
            // Do something else
        } else { /*stub*/ }
    }
    `,
    `
    function x() {
        let a = 0
        if(a===0)
            a = 1;
        else
            a = 2;
    }
    `,
    `
    function x() {
        let a = 0
        if(a===0) {
            let b = 1;
            if (b === 1) {
                // b=1
            } else { /*stub*/ }
        } else { 
            // Other
        }
    }
    `,
];
const invalidStatemets = [
    `
    function x() {
        let a = 0
        if(a===0) {
            // Do something
        }
    }
    `,
    `
    function x() {
        let a = 0
        if(a===0) {
            // Do something
        } else if (a===1) {
            // Do something else
        }
    }
    `,
    `
    function x() {
        let a = 0
        if(a===0)
            a = 1;
    }
    `,
    `
    function x() {
        let a = 0
        if(a===0) {
            let b = 1;
            if (b === 1) {
                // b=1
            }
        } else { 
            // Other
        }
    }
    `,
];

const messageId: MessageIds = "ifElseRequired";
const messageIdStub: MessageIds = "addStub";

ruleTester.run(RULE_NAME, rule, {
    valid: validStatements,
    invalid: [
        {
            code: invalidStatemets[0],
            errors: [
                {
                    messageId,
                    suggestions: [
                        {
                            messageId: messageIdStub,
                            output: validStatements[0],
                        },
                    ],
                },
            ],
        },
        {
            code: invalidStatemets[1],
            errors: [
                {
                    messageId,
                    suggestions: [
                        {
                            messageId: messageIdStub,
                            output: validStatements[1],
                        },
                    ],
                },
            ],
        },
        {
            code: invalidStatemets[2],
            errors: [
                {
                    messageId,
                },
            ],
        },
        {
            code: invalidStatemets[3],
            errors: [
                {
                    messageId,
                    suggestions: [
                        {
                            messageId: messageIdStub,
                            output: validStatements[3],
                        },
                    ],
                },
            ],
        },
    ],
});
