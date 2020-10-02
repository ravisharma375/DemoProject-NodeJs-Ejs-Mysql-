const axios = require("axios");
const { config } = require("../config");

class SMS {
  constructor() {
    this.apiKey = config.get("SMS_API_KEY");
    this.sender = config.get("SMS_SENDER");
    this.url = config.get("SMS_API_ENDPOINT");
  }

  async send(phoneNumber, message) {
    try {
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log(message);
        return true;
      }

      const response = await axios({
        method: "get",
        url: this.url,
        params: {
          mobiles: phoneNumber,
          authkey: this.apiKey,
          route: 4,
          sender: this.sender,
          message,
          country: 91,
        },
      });

      if (response.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      throw new Error("SMS delivery failed. Please try again after some time.");
    }
  }
}

module.exports = { SMS };
