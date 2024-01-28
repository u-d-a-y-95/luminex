export type iterationType = "once" | "repeat";

export type Data<K extends keyof T, T> = {
  releaseTime: number;
  topicName: K;
  body: T[K];
};

export type CB<K extends keyof T, T> = (message: Data<K, T>) => void;

export type Ray<K> = {
  key: string;
  topicName: K;
  iteration: iterationType;
  off: () => void;
};

type Listner<K extends keyof T, T> = Ray<K> & { cb: CB<K, T> };

export type Event<T> = {
  [K in keyof T]?: {
    [Key: string]: Listner<K, T>;
  };
};
