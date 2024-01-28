export const generateUUID = (): string => {
  const UUID_V4_PATTERN = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

  let timestampFromDate = new Date().getTime();
  let timestampFromPerformance =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0;

  return UUID_V4_PATTERN.replace(/[xy]/g, (char) => {
    const randomValue = Math.random() * 16;
    let value;

    if (timestampFromDate > 0) {
      value = (timestampFromDate + randomValue) % 16 | 0;
      timestampFromDate = Math.floor(timestampFromDate / 16);
    } else {
      value = (timestampFromPerformance + randomValue) % 16 | 0;
      timestampFromPerformance = Math.floor(timestampFromPerformance / 16);
    }

    value = char === "x" ? value : (value & 0x3) | 0x8;

    return value.toString(16);
  });
};
