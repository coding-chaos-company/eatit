module.exports = (req, _res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    req.method = 'GET';
  }
  next();
};
