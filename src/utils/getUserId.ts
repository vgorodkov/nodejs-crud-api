export const getUserId = (url: string) => {
  const splittedUrl = url.split('/');

  if (splittedUrl.length >= 3) {
    const userId = splittedUrl[splittedUrl.length - 1];
    return userId || null;
  } else {
    return null;
  }
};
