import { Event, CB, Ray, Data, iterationType } from "./index.type";
import { v4 as uuid } from "uuid";

const getUniquekey = () => uuid().split("-").join("");

export class Luminex<T> {
  private events: Event<T> = {};

  private addListner<K extends keyof T>(
    topic: K,
    onMessage: CB<K, T>,
    iterationType: iterationType
  ): Ray<K> {
    if (!(topic in this.events)) {
      this.events[topic] = {};
    }
    const key = getUniquekey();

    const res = {
      key,
      topicName: topic,
      iteration: iterationType,
      off: () => {
        this.removeListner(topic, key);
      },
    };

    // @ts-expect-error: type error
    this.events[topic][key] = {
      ...res,
      cb: onMessage,
    };

    return res;
  }

  private removeListner<K extends keyof T>(topicName: K, key: string) {
    const hub = this.events[topicName];
    if (!hub) return;
    delete hub[key];
  }

  public on<K extends keyof T>(topic: K, onMessage: CB<K, T>): Ray<K> {
    return this.addListner(topic, onMessage, "repeat");
  }

  public once<K extends keyof T>(topic: K, onMessage: CB<K, T>) {
    return this.addListner(topic, onMessage, "once");
  }

  public off<K extends keyof T>(instinct: Ray<K>) {
    this.removeListner(instinct.topicName, instinct.key);
  }

  public reset() {
    // Remove all events
    for (const topic in this.events) {
      delete this.events[topic];
    }
  }

  public emit<K extends keyof T>(topic: K, message: T[K]): void {
    const time = new Date().getTime();
    const hub = this.events[topic];
    if (hub) {
      const response: Data<K, T> = {
        releaseTime: time,
        topicName: topic,
        body: message,
      };
      Object.values(hub).forEach((listner) => {
        listner.cb(response);
        if (listner.iteration === "once")
          this.removeListner(listner.topicName, listner.key);
      });
    }
  }
}
