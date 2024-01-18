import { TopicStruct } from "./event.type";
import {
  Event,
  GlowCB,
  Instinct,
  returnGlowCB,
  iterationType,
  Topics
} from "./index.type";

const getUniquekey = () => Date.now() + (Math.random() * 100000).toFixed();

export class FireFly {
  private events: Event<Topics> = {};

  private addListner<T extends Topics>(
    topic: T,
    onMessage: GlowCB<T>,
    iterationType: iterationType
  ): Instinct {
    if (!(topic in this.events)) {
      this.events[topic] = {};
    }
    const key = getUniquekey();
    const res = {
      key,
      topicName: topic,
      iteration: iterationType
    };

    this.events[topic][key] = {
      ...res,
      //@ts-expect-error: type checking
      cb: onMessage
    };

    return res;
  }

  private removeListner(instinct: Instinct) {
    delete this.events[instinct.topicName][instinct.key];
  }

  public glow<T extends Topics>(topic: T, onMessage: GlowCB<T>): Instinct {
    return this.addListner(topic, onMessage, "repeat");
  }

  public blink<T extends Topics>(topic: T, onMessage: GlowCB<T>) {
    return this.addListner(topic, onMessage, "once");
  }

  public kill(instinct: Instinct) {
    this.removeListner(instinct);
  }

  public reborn() {
    this.events = {};
  }

  public fly<T extends Topics>(
    topic: T,
    message: { body: TopicStruct[T] }
  ): void {
    const time = new Date().getTime();
    const hub = this.events[topic];
    if (hub) {
      const response: returnGlowCB<T> = {
        releaseTime: time,
        topicName: topic,
        body: message.body
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
