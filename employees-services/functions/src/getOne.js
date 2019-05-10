"use strict"

const admin = require("firebase-admin");

module.exports = (request) =>
    new Promise((resolve, reject) =>
        admin.auth()
            .verifyIdToken(request.get("Authorization").split("Bearer ")[1])
            .then(() => resolve(admin.database().ref("employees").child((request.query.id) - 1).once("value")))
            .catch((error) => reject(error)));
