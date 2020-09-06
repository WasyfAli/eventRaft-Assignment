"use strict";
export const port = 8001;
export const host = "127.0.0.1";
export const environment = "development";
export const SERVICE_NAME = "admin-platform";

export const mongodb = {
  uri: "mongodb://localhost:27017/raftLabAssignment",
};

// export const options = {
//   reconnectTries: 100,
//   reconnectInterval: 500,
//   autoReconnect: true,
//   //useNewUrlParser: true,
//   dbName: "platform",
// };

// SET
export const utils = {
  CRON_WORKER: "*/2 * * * * *",
  PASSWORD_SALT: "MYNodeBoilerPlate_AdnjssckjFasDkmsRakld",
  JWT_SECRET: "MYNodeBoilerPlate_GtvhkLRTgtNdGl",
  JWT_TOKEN_EXPIRE: 2 * 86000, // 2 day

  ENCRYPT_SALT: "MYNodeBoilerPlate_GtvhkLRTgtNdGl",
  // ENCRYPT_TOKEN_EXPIRE: 2 * 86000, // 2 day
};

export const secret = {
  NODE_TOKEN_SECRET: "Basic dGVzdGluZ0F1dGg6dGVzdGluZ0BBdXRo",
};
// export const amazon = {
//   bucketName: "platform-auxy",
//   imageUrl: "",
// };
