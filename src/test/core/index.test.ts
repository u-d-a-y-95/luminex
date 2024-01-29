import { createLuminex } from "../..";
import { Luminex } from "../../core";

type Event = {
  SHOW: { name: string };
};

describe("Luminex", () => {
  let luminex: Readonly<Luminex<Event>>;

  beforeEach(() => {
    luminex = createLuminex<Event>();
  });

  afterEach(() => {
    luminex.reset();
  });

  it("should create an immutable instance of luminex", () => {
    expect(() => {
      (luminex as any).newProperty = "new value";
    }).toThrow(TypeError);
  });

  it("should add and remove events for REPEAT iteration type", () => {
    const listener = jest.fn();
    const ray = luminex.on("SHOW", listener);

    luminex.emit("SHOW", { name: "Hello" });

    expect(listener).toHaveBeenCalledWith({
      releaseTime: expect.any(Number),
      topicName: "SHOW",
      body: { name: "Hello" },
    });

    luminex.off(ray);
    luminex.emit("SHOW", { name: "Hello" });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("should add and remove events for ONCE iteration type", () => {
    const listener = jest.fn();
    const ray = luminex.once("SHOW", listener);

    luminex.emit("SHOW", { name: "Hello" });

    luminex.emit("SHOW", { name: "Hello" });
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
