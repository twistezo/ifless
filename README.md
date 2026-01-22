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

## Usage

### Install

```bash
bun install ifless
# or
npm install ifless
```

### Import and use

```ts
import { when } from 'ifless'

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
