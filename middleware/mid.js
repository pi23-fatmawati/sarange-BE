module.exports = (req, res, next) => {
  console.log(`Received ${req.method}`);
  next();
};
