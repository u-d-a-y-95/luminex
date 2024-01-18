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

export type Event<T> =
  | {
      [K in keyof T]?: {
        [Key: string]: Instinct<keyof T> & { cb: GlowCB<keyof T, T> };
      };
    }
  | object;
