"use strict"

const data = require("./data");

module.exports = (request) => Promise.resolve(data.all.find(employee => Number(employee.id) === Number(request.query.id)));
