export enum EventType {
  ONCE = "once",
  REPEAT = "repeat",
}

export type Data<K extends keyof T, T> = {
  releaseTime: number;
  topicName: K;
  body: T[K];
};

export type CB<K extends keyof T, T> = (message: Data<K, T>) => void;

export type Ray<K> = {
  key: string;
  topicName: K;
  eventType: EventType;
  off: () => void;
};

type Listner<K extends keyof T, T> = Ray<K> & { cb: CB<K, T> };

export type Event<T> = Map<keyof T, Map<string, Listner<keyof T, T>>>;
