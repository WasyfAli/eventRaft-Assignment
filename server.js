const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const http = require("http");
const path = require("path");
const neo4j = require("neo4j-driver");

// Powering realtime experiences
// const pusher = require("pusher");

// ENABLE MODULE ALIAS
import "module-alias/register";
// require("./moduleAliases"); // Testing

// USE CUSTOM MODULES
import * as constant from "@/app/helpers/constant";
const port = constant.config.port || 8001;
import LoggingService from "@/app/services/LoggingService";

const app = express();
const server = http.createServer(app);

//NEO4J driver initialize
export const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "redhat")
);

//Database connection (Mongoose)
const mongoURI = require("./config").mongodb.uri;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, //keep database session alive
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((err) => console.log(err));

app.set("port", process.env.PORT || port);
// Static folder
app.use(express.static(path.join(__dirname, "public"), { maxage: "7d" }));
// view engine
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "500mb" }));
app.use(cookieParser());
morgan.token("process-ip", function (req) {
  return (
    req.headers["cf-connecting-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.ip ||
    ""
  );
});

app.use(
  morgan(
    ':process-ip - :date - ":method :url HTTP/:http-version" - :status - :res[content-length] - :response-time ms',
    {
      stream: {
        write: function (msg) {
          return LoggingService.consoleLog("MORGAN", msg);
        },
      },
    }
  )
);

app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    safeFileNames: true,
    abortOnLimit: true,
  })
);

// ENABLE OR INITIATE ROUTES
require("@/routes").default(app);

server.listen(app.get("port") || 8001, "192.168.122.163");
const onError = (error) => {
  if (error.syscall !== "listen") throw error;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};
const onListening = () => {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Server Listening On Custom PORT: " + bind);
};
server.on("error", onError);
server.on("listening", onListening);
