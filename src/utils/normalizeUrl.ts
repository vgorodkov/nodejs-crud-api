export const normalizeUrl = (parsedUrl: string) => {
  let normalizedUrl = parsedUrl.replace(/\/+/g, '/');
  if (normalizedUrl[normalizedUrl.length - 1] === '/') {
    normalizedUrl = normalizedUrl.slice(1, -1);
  }
  if (normalizedUrl[0] === '/') {
    normalizedUrl = normalizedUrl.slice(1);
  }
  return normalizedUrl.trim();
};
