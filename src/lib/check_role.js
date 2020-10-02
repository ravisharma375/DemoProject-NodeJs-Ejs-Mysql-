const { HttpError } = require("../lib/http_error");

function checkRole(...allowed) {
  const isAllowed = role => allowed.indexOf(role) > -1;

  return (req, res, next) => {
    if (req.user && isAllowed(req.user.role)) {
      next();
    } else {
      res.status(403).json(new HttpError("UNAUTHORIZED", "You are not authorized to access this resource."));
    }
  };
}

module.exports = { checkRole };
