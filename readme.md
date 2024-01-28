# Luminex

Luminex is a lightweight, type-safe event emitter library that seamlessly works in both browser and Node.js environments.

## Features

- 🌐 Cross-platform: Works in both browser and Node.js environments.
- 🧪 Type-safe: Utilizes TypeScript to ensure type safety for your events.
- 🚀 Simple API: Offers intuitive methods for common event emitter actions.

## Installation

Install Luminex using npm:

```bash
npm install luminex
```

# Usage

## Creating Luminex Instances

```typescript
import { createLuminex, Luminex } from "luminex";

// Create an instance of Luminex using the createLuminex function
const luminex: Luminex<MyEventData> = createLuminex();

// Subscribe to an event
const onEvent = luminex.on("eventName", (data) => {
  console.log("Event received:", data);
});

// Emit an event
luminex.emit("eventName", {
  /* your data */
});

// Unsubscribe from an event
luminex.off("eventName", onEvent);

// Reset and remove all event subscriptions
luminex.reset();
```

# API

## `createLuminex<T>(): Luminex<T>`

A function responsible for creating instances of the Luminex event emitter.

## `on<T>(eventName: string, callback: (data: T) => void): () => void`

Subscribe to an event and receive callbacks whenever the event is emitted. Returns a function to unsubscribe.

## `emit<T>(eventName: string, data: T): void`

Emit an event with the specified data.

## `off(eventName: string, callback: () => void): void`

Unsubscribe from an event using the callback function obtained from the `on` method.

## `reset(): void`

Remove all event subscriptions.

# License

This project is licensed under the MIT License.
