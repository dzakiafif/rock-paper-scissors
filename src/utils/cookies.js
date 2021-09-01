const cookies = (req, type) => {
  const cookie = req.headers.cookie.split(';');
  const accessToken = cookie[Object.keys(cookie).find((key) => cookie[key].match(
    new RegExp(type),
  ))];
  return accessToken;
};

export default cookies;
