## Building and running

This project uses **pnpm** as its package manager. Please use `pnpm` for all dependency management and script execution.

Before submitting any changes, it is crucial to validate them by running the full preflight check. This command will build the project, run all tests, check for type errors, and lint the code.

To run the full suite of checks, execute the following command:

```bash
pnpm preflight
```

This single command ensures that your changes meet all the quality gates of the project. While you can run the individual steps (`build`, `test`, `typecheck`, `lint`) separately, it is highly recommended to use `pnpm preflight` to ensure a comprehensive validation.

## Writing Tests

This project uses **Vitest** as its primary testing framework. When writing tests, aim to follow existing patterns. Key conventions include:

### Test Structure and Framework

- **Framework**: All tests are written using Vitest (`describe`, `it`, `expect`, `vi`).
- **File Location**: Test files (`*.test.ts`) are co-located with the source files they test.
- **Configuration**: Test environments are defined in `vitest.config.ts` files.
- **Setup/Teardown**: Use `beforeEach` and `afterEach`. Commonly, `vi.resetAllMocks()` is called in `beforeEach` and `vi.restoreAllMocks()` in `afterEach`.

### Mocking (`vi` from Vitest)

- **ES Modules**: Mock with `vi.mock('module-name', async (importOriginal) => { ... })`. Use `importOriginal` for selective mocking.
  - _Example_: `vi.mock('os', async (importOriginal) => { const actual = await importOriginal(); return { ...actual, homedir: vi.fn() }; });`
- **Mocking Order**: For critical dependencies (e.g., `os`, `fs`) that affect module-level constants, place `vi.mock` at the _very top_ of the test file, before other imports.
- **Hoisting**: Use `const myMock = vi.hoisted(() => vi.fn());` if a mock function needs to be defined before its use in a `vi.mock` factory.
- **Mock Functions**: Create with `vi.fn()`. Define behavior with `mockImplementation()`, `mockResolvedValue()`, or `mockRejectedValue()`.
- **Spying**: Use `vi.spyOn(object, 'methodName')`. Restore spies with `mockRestore()` in `afterEach`.

### Commonly Mocked Modules

- **Node.js built-ins**: `fs`, `fs/promises`, `os` (especially `os.homedir()`), `path`, `child_process` (`execSync`, `spawn`).
- **External SDKs**: `@google/genai`, `@modelcontextprotocol/sdk`.
- **Internal Project Modules**: Dependencies from other project packages are often mocked.

### Asynchronous Testing

- Use `async/await`.
- For timers, use `vi.useFakeTimers()`, `vi.advanceTimersByTimeAsync()`, `vi.runAllTimersAsync()`.
- Test promise rejections with `await expect(promise).rejects.toThrow(...)`.

### General Guidance

- When adding tests, first examine existing tests to understand and conform to established conventions.
- Pay close attention to the mocks at the top of existing test files; they reveal critical dependencies and how they are managed in a test environment.

## Git Repo

The main branch for this project is called "main"

## TypeScript Development

This project is a TypeScript library for a GraphQL client. When contributing, please adhere to the following principles to ensure the codebase remains clean, maintainable, and idiomatic.

### Prefer Functions and Plain Objects over Classes

While JavaScript classes can be useful for encapsulating state and behavior, they often introduce unnecessary complexity. We prefer a more functional approach using plain objects and functions.

- **Reduced Boilerplate**: Classes can introduce boilerplate like constructors, `this` binding, and getters/setters. Plain objects with TypeScript interfaces or types offer strong typing with less verbosity.
- **Enhanced Readability**: Plain objects and functions are often easier to reason about. Their behavior is explicit, without hidden state or complex inheritance chains.
- **Simplified Immutability**: A functional approach encourages immutability. Instead of modifying objects, you create new ones with the updated values, which helps prevent side effects.
- **Easy Serialization**: Plain JavaScript objects are easily serialized to JSON, a common requirement for a GraphQL client.

### Embrace ES Module Syntax for Encapsulation

Leverage ES module syntax (`import`/`export`) to define clear public and private APIs.

- **Clear Public API**: Exported functions and variables form the public API of a module. Anything not exported is private to that module.
- **Enhanced Testability**: This encourages testing the public API of your modules, rather than their internal implementation details. If you need to test an unexported function, consider extracting it into its own module.
- **Reduced Coupling**: Well-defined module boundaries reduce coupling, making the code easier to refactor and understand.

### Avoiding `any` Types and Type Assertions; Preferring `unknown`

To leverage TypeScript's static type checking, avoid `any` and be cautious with type assertions.

- **The Dangers of `any`**: Using `any` disables type checking, increasing the risk of runtime errors.
- **Preferring `unknown`**: When a type is truly unknown, use `unknown`. It's a type-safe alternative that requires type narrowing before you can operate on the value.
- **Type Assertions (`as Type`)**: Use type assertions sparingly. They can be useful when you have more information than the compiler, but they bypass type safety and can lead to runtime errors if used incorrectly.

### Embracing JavaScript's Array Operators

Use JavaScript's array operators like `.map()`, `.filter()`, and `.reduce()` to promote a functional and declarative style.

- **Promotes Immutability**: Most array operators return new arrays, leaving the original array unchanged.
- **Improves Readability**: Chaining array operators is often more concise and expressive than traditional loops.
- **Facilitates Functional Programming**: These operators are cornerstones of functional programming, encouraging pure functions and predictable code.

By consistently applying these principles, we can maintain a codebase that is not only efficient and performant but also a joy to work with.

## Comments policy

Only write high-value comments if at all. Avoid talking to the user through comments.
