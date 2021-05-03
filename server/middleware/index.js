const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const logger = require("koa-logger");
const error = require("./error")

module.exports = [
  error,
  logger(),
  cors(),
  bodyParser({
    extendTypes: {
      json: ["text/plain"] // will parse text/plain type body as a JSON string
    }
  })
];
