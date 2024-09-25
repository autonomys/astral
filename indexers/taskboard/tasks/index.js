const { accountBalanceUpdate } = require("./accountBalanceUpdate");

const tasks = {
  accountBalanceUpdate: {
    handler: accountBalanceUpdate,
    concurrency: 5,
  },
};

module.exports = tasks;
