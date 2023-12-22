# Enforce `switch` statements have a `default` case (`switch-default`)

This rule makes sure that every switch statement includes a default case

```typescript
// valid
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

// invalid - missing default
function test() {
    const a = 1;
    switch(a) {
        case 1:
            break;
        case 2:
            break;
    }
}
```