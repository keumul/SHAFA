const jwt = require('jsonwebtoken');

module.exports = function(roleId) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: "INFO: Unauthorized!" });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.roleId !== roleId) {
        return res.status(403).json({ message: "INFO: User doesn't have access!" });
      }
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: "INFO: Unauthorized!" });
    }
  };
};
