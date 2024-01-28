import { Firefly } from "./core";

export const born = <T>() => {
  const fireFly = new Firefly<T>();
  return Object.freeze(fireFly);
};
