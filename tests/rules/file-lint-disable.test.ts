/* eslint-disable */

import { RuleTester } from "@typescript-eslint/utils/dist/ts-eslint";
import rule, { MessageIds, RULE_NAME } from "../../src/rules/file-lint-disable";

const ruleTester: RuleTester = new RuleTester({
    parser: require.resolve("@typescript-eslint/parser"),
});

const validStatements = [
    `
    function x() {
        // eslint-disableX-next-line @typescript-eslint/no-unused-vars
        let a: any = 0
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
    `,
    `
    function x() {
        /* eslint-disableX-next-line @typescript-eslint/no-unused-vars */
        let a: any = 0
        for(let i = 0; i < 12; i++) {
            a++;
        }
    }
    `,
];
const invalidStatemets = [
    `
    /* eslint-disableX @typescript-eslint/no-unused-vars */
    function x() {
        let a = [3,1,4,1,5,9];
        for (let item of a) console.log(item);
    }
    `,
    `
    /* eslint-disableX assorted-rules/i-interface */
    /* eslint-disableX assorted-rules/i-interface */
    /* eslint-disableX assorted-rules/i-interface */
    /* eslint-disableX assorted-rules/i-interface */
    function x() {
        let a = [3,1,4,1,5,9];
        for (let item of a) console.log(item);
    }
    `,
    `
    /* eslint-disableX 
        assorted-rules/i-interface 
        assorted-rules/i-interface 
    */
    function x() {
        let a = [3,1,4,1,5,9];
        for (let item of a) console.log(item);
    }
    `,
    `
/* 
eslint-disableX
  assorted-rules/i-interface
  assorted-rules/i-interface
  assorted-rules/i-interface
  assorted-rules/i-interface 
 */
   function x() {
    console.log('test');
   }
    `
];

const messageId: MessageIds = "fileLintDisableRequired";

ruleTester.run(RULE_NAME, rule, {
    valid: validStatements,
    invalid: [
        { code: invalidStatemets[0], errors: [{ messageId }] },
        { code: invalidStatemets[1], errors: [{ messageId },{ messageId },{ messageId },{ messageId }] },
        { code: invalidStatemets[2], errors: [{ messageId }] },
        { code: invalidStatemets[3], errors: [{ messageId }] },
    ],
});
