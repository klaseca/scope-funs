# Scope Functions

[![NPM Version](https://img.shields.io/npm/v/scope-funs)](https://www.npmjs.com/package/scope-funs)

Porting the scope functions from the Kotlin standard library to JavaScript/TypeScript

## Installation

```bash
npm i scope-funs
```

## API

### Scope creation

```typescript
import { scope } from 'scope-funs'

const scopeValue = scope([1])

// or

import { Scope } from 'scope-funs'

const scopeValue = new Scope([1])
```

### Methods

| Method        | Description                                                         |
| ------------- | ------------------------------------------------------------------- |
| `let`         | Invoke one or more functions on results of call chains              |
| `also`        | Performing some actions that take the context object as an argument |
| `takeIf`      | Returns self if predicate is true, otherwise undefined              |
| `takeUnless`  | Returns self if predicate is false, otherwise undefined             |
| `skipNullish` | Returns self for non-nullish values, otherwise undefined            |
| `unwrap`      | Extracts the underlying value from the Scope                        |

The `skipNullish` and `unwrap` methods do not exist in the Kotlin. These are additional methods that are needed because JavaScript does not have the `extension function` feature and the library uses a wrapper around values

In the Kotlin, we can call scope function on any value. As example:

```kotlin
val str: String? = "Hello"

val length = str?.let {
    println("let() called on $it")
    it.length
}?.let { it + 1 }
```

The equivalent of this code would be:

```typescript
import { scope } from 'scope-funs'

const str: string | undefined = 'Hello'

const length = scope(str)
  .skipNullish()
  ?.let((it) => {
    console.log(`let() called on ${it}`)
    return it.length
  })
  .let((it) => it + 1)
  .unwrap()
```

## Usage

### Basic

```typescript
import { scope } from 'scope-funs'

const result = scope(5)
  .let((it) => [it]) // Transforms the value
  .also((it) => {
    console.log(`Current value: ${it}`)
    it.push(10)
  }) // Some action
  .unwrap()
// Prints "Current value: 5" and returns [5, 10]
```

### Conditional Operations

```typescript
import { scope } from 'scope-funs'

const positiveScope = scope(-5).takeIf((it) => it > 0) // Returns undefined
const negativeScope = scope(-5).takeUnless((it) => it > 0) // Returns the Scope instance
```

### Nullish Handling

```typescript
import { scope } from 'scope-funs'

const value: string | null = null

const result = scope(value)
  .skipNullish()
  ?.let((it) => it.length) // it is not nullish
  .unwrap() // Returns the length of the value if it is not nullish or returns undefined

// or

const resultNullish = scope(value)
  .let((it) => it?.length ?? 0) // it is nullish
  .unwrap() // Returns the length of the value if it is not nullish or 0
```
