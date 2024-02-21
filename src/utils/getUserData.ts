export const getUserData = (chunk: Buffer) => {
  const stringified = chunk.toString();
  try {
    return JSON.parse(stringified);
  } catch {
    return null;
  }
};
