"use strict"

// Import Firebase Admin SDK.
const admin = require("firebase-admin");

/**
 * Gateway check for authenticated users.
 * If pass, then resolve with all employees data from the Real-Time DataBase.
 * 
 * @returns { Promise }
 */
module.exports = (request) =>
    new Promise((resolve, reject) =>
        admin.auth()
            .verifyIdToken(request.get("Authorization").split("Bearer ")[1])
            .then(() => admin.database().ref("employees").once("value"))
            .then((employees) => resolve(employees.val()))
            .catch((error) => reject(error)));
