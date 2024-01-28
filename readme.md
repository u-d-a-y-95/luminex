# Luminex

Luminex is a lightweight, type-safe event emitter library that seamlessly works in both browser and Node.js environments.

### Features

- 🌐 Cross-platform: Works in both browser and Node.js environments.
- 🧪 Type-safe: Utilizes TypeScript to ensure type safety for your events.
- 🚀 Simple API: Offers intuitive methods for common event emitter actions.

### Installation

Install Luminex using npm:

```bash
npm install luminex
```

## Usage

#### Creating Luminex Instances

```typescript
import { createLuminex } from "luminex";

type Events = {
  SHOW: { message: string };
};

// Create an instance of Luminex using the createLuminex function
const luminex = createLuminex<Events>();
```

#### Subscribe

```typescript
// Subscribe to an event
// "Hello Luminex"
const ray = luminex.on("SHOW", (data) => {
  console.log(data.body);
});
```

#### Emit

```typescript
// Emit an event
luminex.emit("SHOW", {
  message: "Hello Luminex",
});
```

## API

#### Methods

| Method  | Arguments                           | Description                                                                                                         |
| ------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `on`    | `type: string`, `handler: function` | Binds the handler function to the specified type event.                                                             |
| `once`  | `type: string`, `handler: function` | Binds the handler function to the specified type event and unbinds it after one execution.                          |
| `off`   | `type: instance of event binder     | Unbinds the handler function from the specified type event                                                          |
| `emit`  | `type: string`, `...data arguments` | Calls all handler functions bound to the specified type event. It passes all `...data arguments` to those handlers. |
| `reset` |                                     | Removes all events of any and all types, including `*`.                                                             |

# License

This project is licensed under the MIT License.
