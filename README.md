# ifless

Elegant, readable conditional logic for JavaScript/TypeScript using natural language operators (AND, OR, NOT, XOR) and template literals.

## Supported logic and features (with Before/After examples)

- **Logical AND (`AND`, `&&`)**
  - Before:
    ```js
    if (a && b) { do() }
    ```
  - After:
    ```js
    when`${a} AND ${b}`(() => do())
    ```

- **Logical OR (`OR`, `||`)**
  - Before:
    ```js
    if (a || b) { do() }
    ```
  - After:
    ```js
    when`${a} OR ${b}`(() => do())
    ```

- **Logical NOT (`NOT`, `!`)**
  - Before:
    ```js
    if (!a) { do() }
    ```
  - After:
    ```js
    when`NOT ${a}`(() => do())
    ```

- **Logical XOR (`XOR`, `^`)**
  - Before:
    ```js
    if ((a ? 1 : 0) ^ (b ? 1 : 0)) { do() } // for numbers/booleans
    // or for booleans:
    if (!!a !== !!b) { do() }
    ```
  - After:
    ```js
    when`${a} XOR ${b}`(() => do())
    ```

- **Parentheses for grouping and nesting**
  - Before:
    ```js
    if ((a && b) || (c && !d)) { do() }
    ```
  - After:
    ```js
    when`(${a} AND ${b}) OR (${c} AND NOT ${d})`(() => do())
    ```
  - Note: Parentheses are fully supported for grouping and nesting logic.

- **Short-circuit evaluation (lazy function calls)**
  - Before:
    ```js
    if (a && expensiveCheck()) {
    }
    ```
  - After:
    ```js
    when`${a} AND ${() => expensiveCheck()}`(() => {})
    ```

- **Template literals with embedded values**
  - Before:
    ```js
    if (user && user.profile) { do() }
    ```
  - After:
    ```js
    when`${user} AND ${user.profile}`(() => do())
    ```
  - Note: This means you can interpolate any variable or expression directly in the logic string.

- **Boolean conversion (using !!)**
  - Before:
    ```js
    if (!!x && !!y) { do() }
    ```
  - After:
    ```js
    when`${x} AND ${y}`(() => do())
    ```

- **Null/undefined as false**
  - Before:
    ```js
    if (x != null && y != null) { do() }
    ```
  - After:
    ```js
    when`${x} AND ${y}`(() => do())
    ```

- **Arbitrary nesting and combinations of all above**
  - Before:
    ```js
    if ((a && b) || (!c && (d || e))) { do() }
    ```
  - After:
    ```js
    when`(${a} AND ${b}) OR (NOT ${c} AND (${d} OR ${e}))`(() => do())
    ```

## New: Contextual Logic with `when.ctx()`

You can now define a context object and reference its properties in your logic expressions using `#alias` syntax. This is useful for readable, alias-based logic and for passing values without direct variable interpolation.

### Usage

```ts
import { when } from 'ifless'

const user = { active: true }
const isAdmin = false

when.ctx({ userActive: user.active, isAdmin })`#userActive AND NOT #isAdmin`(() => {
  // This block runs if user.active is true and isAdmin is false
})
```

#### Features

- **Reference context variables**: Use `#name` in your template to refer to values from the context object.
- **Alias support**: You can alias any value to a short or descriptive name.
- **Error on missing or invalid context**: Throws if you reference a `#name` not in the context, or if the context contains a function.
- **No functions in context**: Context values must not be functions.

#### Example

```ts
const foo = 1
const bar = 2

when.ctx({ x: foo, y: bar })`#x AND #y`(() => {
  // Runs if both foo and bar are truthy
})
```

#### Error Handling

- Throws `Unknown context variable: #name` if you reference a variable not in the context.
- Throws `Functions are not allowed in context` if you try to pass a function as a context value.

## Usage

### Install

```bash
bun install ifless
# or
npm install ifless
```

### Import and use

#### ESM (ECMAScript Modules)

```ts
import { when } from 'ifless'

when`${a} AND ${b}`(() => do())
```

#### CommonJS (CJS)

```js
const { when } = require('ifless')

when`${a} AND ${b}`(() => do())
```

### Available commands

```bash
bun run build      # build all formats
bun test           # run all tests
bun run lint       # check lint
bun run lint:write # fix lint & format
bun run typecheck  # check types
```
