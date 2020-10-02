const nodemailer = require("nodemailer");
const moment = require("moment");
const crypto = require("crypto");

const { config } = require("../config");

class Email {
  constructor() {
    this.host = config.get("SMTP_HOST");
    this.port = config.get("SMTP_PORT");
    this.username = config.get("SMTP_USERNAME");
    this.password = config.get("SMTP_PASSWORD");

    this.transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: true,
      auth: {
        user: this.username,
        pass: this.password,
      },
      connectionTimeout: 5 * 60 * 1000,
    });
  }

  async send(to, subject, body) {
    try {
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        // console.log(body);
        return true;
      }

      await this.transporter.sendMail({
        from: `${this.username}`,
        to, // list of receivers
        subject,
        html: body,
      });
      return true;
    } catch (error) {
      console.log(error);
      throw new Error("Email delivery failed. Please try again after some time.");
    }
  }

  /* eslint-disable */
  generateEmailToken() {
    const emailToken = crypto.randomBytes(256).toString("hex");

    const emailTokenExpiry = moment()
      .add(15, "minutes")
      .format();
    return { emailToken, emailTokenExpiry };
  }
  /* eslint-enable */
}

module.exports = { Email };
