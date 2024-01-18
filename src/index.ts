import { FireFly } from "./core";

export const createFireFly = <T>() => {
  const fireFly = new FireFly<T>();
  return Object.freeze(fireFly);
};
