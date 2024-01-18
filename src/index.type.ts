import { TopicStruct } from "./event.type";
export type Topics = keyof TopicStruct;
export type iterationType = "once" | "repeat";

export type returnGlowCB<T extends Topics> = {
  releaseTime: number;
  topicName: Topics;
  body: TopicStruct[T];
};

export type GlowCB<T extends Topics> = (message: returnGlowCB<T>) => void;

export type Instinct = {
  key: string;
  topicName: Topics;
  iteration: iterationType;
};

export type Event<T extends Topics> = {
  [key: string]: {
    [key: string]: Instinct & { cb: GlowCB<T> };
  };
};
