import { Luminex } from "./core";

export const createLuminex = <T>() => {
  const luminex = new Luminex<T>();
  return Object.freeze(luminex);
};
