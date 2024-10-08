# Enforce `===` instead of `==` case (`triple-equals`)

This rule makes sure that equals comparison uses triple equals

```typescript
// valid
function test() {
    let a = 1;
    if (a === 1) {
        // Do something
    } else {
        // Do something else
    }
}

// invalid
function test() {
    let a = 1;
    if (a == 1) {
        // Do something
    } else {
        // Do something else
    }
}
```