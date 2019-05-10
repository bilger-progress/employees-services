"use strict"

const admin = require("firebase-admin");

module.exports = (request) =>
    new Promise((resolve, reject) =>
        admin.auth()
            .verifyIdToken(request.get("Authorization").split("Bearer ")[1])
            .then(() => admin.database().ref("employees").once("value"))
            .then((employees) => resolve(employees.val()))
            .catch((error) => reject(error)));
