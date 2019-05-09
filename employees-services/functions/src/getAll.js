"use strict"

const data = require("./data");

module.exports = (request) => Promise.resolve(data.all);
