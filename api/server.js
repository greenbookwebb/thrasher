const { spawn } = require("child_process");
const server = spawn("node", ["server.js"]);

module.exports = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Server running" }),
  };
};