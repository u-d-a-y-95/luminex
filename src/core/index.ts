import { Event, CB, Ray, Data, IterationType } from "./index.type";
import { generateUUID } from "../utils";

const getUniquekey = () => generateUUID().split("-").join("");

export class Luminex<T> {
  private events: Event<T> = new Map();

  private addListener<K extends keyof T>(
    topic: K,
    onMessage: CB<K, T>,
    iterationType: IterationType
  ): Ray<K> {
    if (!this.events.has(topic)) {
      this.events.set(topic, new Map());
    }

    const key = getUniquekey();

    const res = {
      key,
      topicName: topic,
      iterationType,
      off: () => {
        this.removeListener(topic, key);
      },
      cb: onMessage as CB<keyof T, T>,
    };

    const event = this.events.get(topic);

    event?.set(key, res);

    return res;
  }

  private removeListener<K extends keyof T>(topicName: K, key: string): void {
    const hub = this.events.get(topicName);

    if (!hub) return;

    hub.delete(key);
  }

  public on<K extends keyof T>(topic: K, onMessage: CB<K, T>): Ray<K> {
    return this.addListener(topic, onMessage, IterationType.REPEAT);
  }

  public once<K extends keyof T>(topic: K, onMessage: CB<K, T>): Ray<K> {
    return this.addListener(topic, onMessage, IterationType.ONCE);
  }

  public off<K extends keyof T>(instinct: Ray<K>) {
    this.removeListener(instinct.topicName, instinct.key);
  }

  public reset(): void {
    this.events.clear();
  }

  public emit<K extends keyof T>(topic: K, message: T[K]): void {
    const time = new Date().getTime();
    const hub = this.events.get(topic);

    if (hub) {
      const response: Data<K, T> = {
        releaseTime: time,
        topicName: topic,
        body: message,
      };

      hub.forEach((listener) => {
        listener.cb(response);
        if (listener.iterationType === IterationType.ONCE) {
          this.removeListener(listener.topicName, listener.key);
        }
      });
    }
  }
}
