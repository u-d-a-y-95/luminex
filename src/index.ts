import { Luminex } from "./core";

export const createLuminex = <T>() => {
  const fireFly = new Luminex<T>();
  return Object.freeze(fireFly);
};
