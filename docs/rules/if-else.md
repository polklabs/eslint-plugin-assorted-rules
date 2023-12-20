# Enforce every `if` has an `else` (`if-else`)

This rule makes sure that every if statement ends with an else statement. `else if (/*test*/) {}` does not count as an else statement.

```typescript
// valid
if (a === 'foo') { 
    a = 'bar';
} else {
    a = 'else';
}

// invalid
if (a === 'foo') {
    a = 'bar';
}
```

```typescript
// valid
if (a === 'foo') { 
    a = 'bar';
} else if (a === 'bar') {
    a = 'hello';
} else {
    a = 'world';
}

// invalid
if (a === 'foo') {
    a = 'bar';
} else if (a === 'bar') {
    a = 'hello';
}
```

```typescript
// valid
if (a === 'foo')
    a = 'bar';
else
    b = 'hello world';

// invalid
if (a === 'foo')
    a = 'bar';
```