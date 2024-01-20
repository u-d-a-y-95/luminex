import { FireFly } from "./core";

export const born = <T>() => {
  const fireFly = new FireFly<T>();
  return Object.freeze(fireFly);
};
