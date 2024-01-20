import {
  Event,
  GlowCB,
  Instinct,
  returnGlowCB,
  iterationType,
} from "./index.type";

const getUniquekey = () => Date.now() + (Math.random() * 100000).toFixed();

export class FireFly<T> {
  private events: Event<T> = {};

  private addListner<K extends keyof T>(
    topic: K,
    onMessage: GlowCB<K, T>,
    iterationType: iterationType
  ): Instinct<K> {
    if (!(topic in this.events)) {
      this.events[topic] = {};
    }
    const key = getUniquekey();

    const res = {
      key,
      topicName: topic,
      iteration: iterationType,
    };

    // @ts-expect-error: type error
    this.events[topic][key] = {
      ...res,
      cb: onMessage,
    };

    return res;
  }

  private removeListner<K extends keyof T>(instinct: Instinct<K>) {
    const hub = this.events[instinct.topicName];
    if (!hub) return;
    delete hub[instinct.key];
  }

  public glow<K extends keyof T>(
    topic: K,
    onMessage: GlowCB<K, T>
  ): Instinct<K> {
    return this.addListner(topic, onMessage, "repeat");
  }

  public blink<K extends keyof T>(topic: K, onMessage: GlowCB<K, T>) {
    return this.addListner(topic, onMessage, "once");
  }

  public kill<K extends keyof T>(instinct: Instinct<K>) {
    this.removeListner(instinct);
  }

  public reborn() {
    // Remove all events
    for (const topic in this.events) {
      delete this.events[topic];
    }
  }

  public fly<K extends keyof T>(topic: K, message: T[K]): void {
    const time = new Date().getTime();
    const hub = this.events[topic];
    if (hub) {
      const response: returnGlowCB<K, T> = {
        releaseTime: time,
        topicName: topic,
        body: message,
      };
      Object.values(hub).forEach((listner) => {
        listner.cb(response);
        if (listner.iteration === "once") {
          this.removeListner(listner);
        }
      });
    }
  }
}
