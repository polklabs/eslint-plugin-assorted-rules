# Enforce all `interface` names start with 'I' (`i-interface`)

This rule makes sure that every interface definition begins with an I + {capital letter}

```typescript
// valid
export interface IForm {
    id: string;
}

// valid
export interface IEntityObject {
    id: string;
}

// invalid - no I
export interface Form {
    id: string
}

// invalid I not capitalized
export interface iForm {
    id: string;
}

// invalid - f not capitalized
export interface Iform {
    id: string;
}

// invalid - I and f not capitalized
export interface iform {
    id: string;
}
```