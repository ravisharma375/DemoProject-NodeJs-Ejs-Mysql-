const jwt = require("jsonwebtoken");
const HttpStatus = require("http-status");
const { HttpError } = require("../lib/http_error");
const { config } = require("../config");

const jwtSecret = config.get("JWT_SECRET");
const refreshTokenSecret = config.get("REFRESH_TOKEN_SECRET");

// eslint-disable-next-line consistent-return
function checkAuth(req, res, next) {
  const header = req.header("Authorization");
  let secret = jwtSecret;

  if (req.path === "/user/token/refresh") {
    secret = refreshTokenSecret;
  }

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    // eslint-disable-next-line func-names, consistent-return
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return res.status(HttpStatus.UNAUTHORIZED).json(new HttpError("UNAUTHORIZED", "Invalid Token"));
      }

      req.user = decoded;
      next();
    });
  } else {
    return res.status(HttpStatus.UNAUTHORIZED).json(new HttpError("UNAUTHORIZED", "Invalid Token"));
  }
}

module.exports = { checkAuth };
