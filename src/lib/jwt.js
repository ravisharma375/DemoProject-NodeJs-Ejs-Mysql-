const jwt = require("jsonwebtoken");
const { config } = require("../config");

class JWT {
  constructor() {
    this.jwtSecret = config.get("JWT_SECRET");
    this.refreshTokenSecret = config.get("REFRESH_TOKEN_SECRET");
    this.jwtTTL = config.get("JWT_TTL");
    this.refreshTokenTTL = config.get("REFRESH_TOKEN_TTL");
  }

  sign(user) {
    const token = jwt.sign(user, this.jwtSecret, { expiresIn: this.jwtTTL });
    const refreshToken = jwt.sign(user, this.refreshTokenSecret, { expiresIn: this.refreshTokenTTL });

    return {
      token,
      refreshToken,
    };
  }
}

module.exports = { JWT };
