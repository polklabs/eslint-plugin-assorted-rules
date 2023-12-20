# Enforce all `while` statements have curly braces `{}` (`while-block`)

This rule makes sure that every while statement uses curly braces. Do not allow single line while statements

```typescript
// valid
while (a === 'foo') { 
    a = 'bar';
}

// invalid
while (a === 'foo')
    a = 'bar';
```

```typescript
// invalid
while (a === 'foo') a = 'bar';
```
