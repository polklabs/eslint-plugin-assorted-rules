# Don't allow disabling linting rules for entire file (`file-lint-disable`)

This rule disallows turning off eslint rules for entire files

```typescript
// valid
function x() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let a: any = 0
    for(let i = 0; i < 12; i++) {
        a++;
    }
}
```

```typescript
// invalid

/* eslint-disable @typescript-eslint/no-unused-vars */
function x() {
    let a = [3,1,4,1,5,9];
    for (let item of a) console.log(item);
}
```