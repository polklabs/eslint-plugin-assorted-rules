# Enforce all `for` statements have curly braces `{}` (`for-block`)

This rule makes sure that every for statement uses curly braces. Do not allow single line for statements

```typescript
// valid
let a = 0
for(let i = 0; i < 12; i++) {
    a++;
}

// invalid
let a = 0
for(let i = 0; i < 12; i++)
    a++;
```

```typescript
// valid
let a = [3,1,4,1,5,9];
for (let item of a) {
    console.log(item);
}

// invalid
for (let item of a) console.log(item);
```
