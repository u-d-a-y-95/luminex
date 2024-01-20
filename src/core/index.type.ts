export type iterationType = "once" | "repeat";

export type returnGlowCB<K extends keyof T, T> = {
  releaseTime: number;
  topicName: K;
  body: T[K];
};

export type GlowCB<K extends keyof T, T> = (
  message: returnGlowCB<K, T>
) => void;

export type Instinct<K> = {
  key: string;
  topicName: K;
  iteration: iterationType;
};

type Listner<K extends keyof T, T> = Instinct<K> & { cb: GlowCB<K, T> };

export type Event<T> = {
  [K in keyof T]?: {
    [Key: string]: Listner<K, T>;
  };
};
