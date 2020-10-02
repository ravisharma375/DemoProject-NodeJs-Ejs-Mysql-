const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const logger = require("morgan");
const path = require("path");
const moment = require("moment");
const cron = require("node-cron");
const helmet = require("helmet");

const app = express();
require("dotenv").config();
const adminView = require("./routes/index");
const passport = require("passport");
const { config } = require("./config");

const { shutdownDatabase } = require("./config/database");
const { checkAuth } = require("./lib/check_auth");



app.use(logger("dev"));
// app.use(helmet());

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
  }),
);
app.use(
  bodyParser.json({
    limit: "50mb",
    extended: false,
  }),
);

app.use(express.static(path.join(__dirname, "../", "public")));
app.set("views", path.join(__dirname, "../", "views"));
app.set("view engine", "ejs");
// console.log(path.join());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cookieParser());
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "L^m&SApi%Jk%",
    saveUninitialized: true,
    resave: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const auth = require("./lib/local_auth");

auth.serializeUser();
auth.deserializeUser();
auth.configureStrategy();
// app.use("/", require("../routes/routes"));

//   ******************  Api Calling Start **********************************************************

app.use("/", adminView);
const server = app.listen(config.get("PORT"), () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${config.get("PORT")}`);
});
// CRON JOB
cron.schedule("0 0 * * *", async () => {
  const todayDate = moment().format("YYYY-MM-DD");
  const allShop = await shopController.getAllShopNotify();
  const allGift = await giftCardController.getAllGiftNotify();

  // TO CHECK SHOP EXPIRE *******************************************
  allShop.forEach(async item => {
    console.log("CHECKING SHOP");
    if (item.endDate == todayDate) {
      const deActiveShop = await shopController.expireAll(item.shopID);
    } else {
      console.log("I will check every days 12 AM");
    }
  });
  // TO CHECK GIFT_CARD EXPIRE *****************************************
  allGift.forEach(async item => {
    console.log("CHECKING GIFT_CARD");
    if (item.endDate == todayDate) {
      const deActiveGift = await giftCardController.expireAll(item.GiftID);
    } else {
      console.log("I will check every days 12 AM");
    }
  });
  console.log("Job Is Running In BackGround ");
});
function gracefulShutdown() {
  // eslint-disable-next-line no-console
  console.log("Received SIGINT or SIGTERM. Shutting down gracefully");

  server.close(() => {
    shutdownDatabase();
    process.exit();
  });
}
// app.io = socketio();
// app.io.sockets.setMaxListeners(0);
server.setTimeout(4 * 60 * 1000);
// app.io.attach(server);

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
