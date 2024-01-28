import { createLuminex } from "../src";

type Event = {
  SHOW: { name: string };
};
const luminex = createLuminex<Event>();

// Subscribe to an event
const ray = luminex.on("SHOW", (data) => {
  console.log("Event received:", data);
});

// Emit an event
luminex.emit("SHOW", {
  name: "Hello Luminex",
});

// Unsubscribe from an event
luminex.off("SHOW", ray);

// Reset and remove all event subscriptions
luminex.reset();
