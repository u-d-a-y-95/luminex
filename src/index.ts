import { Luminex } from "./core";

export const born = <T>() => {
  const fireFly = new Luminex<T>();
  return Object.freeze(fireFly);
};
