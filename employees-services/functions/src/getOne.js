"use strict"

const admin = require("firebase-admin");

const data = require("./data");

module.exports = (request) =>
    new Promise((resolve, reject) =>
        admin.auth()
            .verifyIdToken(request.get("Authorization").split("Bearer ")[1])
            .then(() => resolve(data.all.find(employee => Number(employee.id) === Number(request.query.id))))
            .catch(() => reject(new Error("Unauthorized"))));

