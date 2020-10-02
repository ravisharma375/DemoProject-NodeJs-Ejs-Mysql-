const FCM = require("fcm-push");
const { config } = require("../config");

const serverKey = config.get("FCM_SERVER_KEY");
class Fcm {
  constructor() {
    this.serverKey = config.get("FCM_SERVER_KEY");
  }

  static async sendWithoutData(DeviceId, title, brief, clickAction) {
    const fcm = new FCM(serverKey);
    const message = {
      data: {
        body: brief,
        title,
        image: "/img/user.png",
        action: clickAction,
        data: {
          key: "value",
        },
      },
      to: DeviceId, // required fill with device token or topics
      priority: "high",
    };

    // promise style
    fcm
      .send(message)
      .then(function(response) {
        console.log("Successfully sent with response: ", response);
      })
      .catch(function(err) {
        console.log("Something has gone wrong!");
        console.error(err);
      });
  }

  static async sendAllWithoutData(deviceIds, title, brief, clickAction) {
    const fcm = new FCM(serverKey);
    const message = {
      notification: {
        title,
        body: brief,
        sound: "default",
        click_action: clickAction,
      },
      registration_ids: deviceIds,
      priority: "high",
    };

    // promise style
    fcm
      .send(message)
      .then(function(response) {
        console.log("FCM response: ", response);
      })
      .catch(function(err) {
        console.error(`FCM error: ${err}`);
      });
  }

  static async sendWithData(DeviceId, notification, clickAction) {
    const fcm = new FCM(serverKey);
    // const type=escape(notification.type),

    const message = {
      // notification: {
      //   title: notification.title,
      //   body: notification.brief,
      //   sound: "default",
      //   click_action: notification.actionLink,
      // },

      data: {
        body: notification.brief,
        title: notification.title,
        image: "",
        action: notification.actionLink,
        type: notification.type ? notification.type : "",
        postId: notification.postId ? notification.postId : "",
        fullName: notification.fullName ? notification.fullName : "",
        receiver: notification.receiver ? notification.receiver : "",
      },

      to: DeviceId, // required fill with device token or topics
      priority: "high",
    };
    console.log(message);
    // promise style
    fcm
      .send(message)
      .then(function(response) {
        console.log("Successfully sent with response: ", response);
      })
      .catch(function(err) {
        console.log("Something has gone wrong!");
        console.error(err);
      });
  }

  static async sendAllWithData(deviceIds, notification, clickAction) {
    const fcm = new FCM(serverKey);
    const message = {
      notification: {
        title: notification.title,
        body: notification.brief,
        sound: "default",
        click_action: clickAction,
      },
      data: {
        notificationId: notification.id,
        notificationTitle: notification.title,
        notificationBrief: notification.brief,
        notificationCategory: notification.category,
        updatedAt: notification.updatedAt,
      },
      registration_ids: deviceIds,
      priority: "high",
    };
    console.log(message);
    // promise style
    fcm
      .send(message)
      .then(function(response) {
        console.log("FCM response: ", response);
      })
      .catch(function(err) {
        console.error(`FCM error: ${err}`);
      });
  }
}

module.exports = { Fcm };
