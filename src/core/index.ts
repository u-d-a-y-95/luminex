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
      //@ts-expect-error: type checking
      this.events[topic] = {};
    }
    const key = getUniquekey();

    const res = {
      key,
      topicName: topic,
      iteration: iterationType,
    };

    //@ts-expect-error: type checking
    this.events[topic][key] = {
      ...res,
      cb: onMessage,
    };

    return res;
  }

  // private removeListner(instinct: Instinct) {
  //   delete this.events[instinct.topicName][instinct.key];
  // }

  public glow<K extends keyof T>(topic: K, onMessage: T[K]): void {
    return this.addListner(topic, onMessage, "repeat");
  }

  // public blink<T extends Topics>(topic: T, onMessage: GlowCB<T>) {
  //   return this.addListner(topic, onMessage, "once");
  // }

  // public kill(instinct: Instinct) {
  //   this.removeListner(instinct);
  // }

  // public reborn() {
  //   this.events = {};
  // }

  // public fly<T extends Topics>(
  //   topic: T,
  //   message: { body: TopicStruct[T] }
  // ): void {
  //   const time = new Date().getTime();
  //   const hub = this.events[topic];
  //   if (hub) {
  //     const response: returnGlowCB<T> = {
  //       releaseTime: time,
  //       topicName: topic,
  //       body: message.body,
  //     };
  //     Object.values(hub).forEach((listner) => {
  //       listner.cb(response);
  //       if (listner.iteration === "once") {
  //         this.removeListner(listner);
  //       }
  //     });
  //   }
  // }
}
