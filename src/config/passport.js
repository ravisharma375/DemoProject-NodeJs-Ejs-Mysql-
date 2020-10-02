const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { config } = require("./index");

passport.use(
  new FacebookStrategy(
    {
      clientID: config.get("FACEBOOK_APP_ID"),
      clientSecret: config.get("FACEBOOK_APP_SECRET"),
      callbackURL: config.get("FACEBOOK_CALLBACK_URL"),
      profileFields: ["id", "name", "picture", "email"],
      enableProof: true,
    },

    async function(accessToken, refreshToken, profile, done) {
      return done(profile);
    },
  ),
);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.get("GOOGLE_APP_ID"),
      clientSecret: config.get("GOOGLE_APP_SECRET"),
      callbackURL: config.get("GOOGLE_CALLBACK_URL"),
    },

    function(accessToken, refreshToken, profile, done) {
      return done(profile);
    },
  ),
);

module.exports = passport;
