const { spawn } = require("child_process");
const server = spawn("node", ["server.js"]);

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: "Server running",
  };
};