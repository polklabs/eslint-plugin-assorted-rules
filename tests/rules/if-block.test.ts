import { RuleTester } from "@typescript-eslint/utils/dist/ts-eslint";
import rule, { MessageIds, RULE_NAME } from "../../src/rules/if-block";

const ruleTester: RuleTester = new RuleTester({
    parser: require.resolve("@typescript-eslint/parser"),
});

const validStatements = [
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
        if(a===0) {
            let b = 1;
            if (b === 1) {
                // b=1
            } else { 
                // b=2
            }
        } else { 
            // Other
        }
    }
    `,
    `
    function x() {
        let a = 0
        if(a===0) {
            return;
        }
    }
    `,
];
const invalidStatements = [
    `
    function x() {
        let a = 0
        if(a===0) a = 1;
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
        if(a===0)
            a = 1;
    }
    `,
    `
    function x() {
        let a = 0
        if(a===0) a = 1; else a = 2;
    }
    `,
    `
    function x() {
        let a = 0
        if(a===0) a = 1; else {
            a = 2;
        }
    }
    `,
    `
    function x() {
        let a = 0
        if(a===0) {
            a = 1; 
        } else 
            a = 2;
    }
    `,
    `
    function x() {
        let a = 0
        if(a===0) return;
    }
    `,
];

const messageId: MessageIds = "ifBlockRequired";

ruleTester.run(RULE_NAME, rule, {
    valid: validStatements,
    invalid: [
        { code: invalidStatements[0], errors: [{ messageId }] },
        { code: invalidStatements[1], errors: [{ messageId }] },
        { code: invalidStatements[2], errors: [{ messageId }] },
        { code: invalidStatements[3], errors: [{ messageId }] },
        { code: invalidStatements[4], errors: [{ messageId }] },
        { code: invalidStatements[5], errors: [{ messageId }] },
        { code: invalidStatements[6], errors: [{ messageId }] },
    ],
});
