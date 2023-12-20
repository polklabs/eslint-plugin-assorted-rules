# Enforce all `if` statements have curly braces `{}` (`if-block`)

This rule makes sure that every if statement uses curly braces. Do not allow single line if statements

```typescript
// valid
if (a === 'foo') { 
    a = 'bar';
} else {
    a = 'else';
}

// invalid
if (a === 'foo')
    a = 'bar';
else
    a = 'else';
```

```typescript
// valid
if (a === 'foo') { 
    a = 'bar';
}

// invalid
if (a === 'foo') a = 'bar';
```

```typescript
// invalid
if (a === 'foo') a = 'bar'; else b = 'hello world';
```