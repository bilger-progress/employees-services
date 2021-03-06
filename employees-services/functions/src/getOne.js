"use strict"

// Require Firebase Admin SDK.
const admin = require("firebase-admin");

/**
 * Gateway check for authenticated users.
 * If pass, then fetch employee info from the Real-Time DataBase.
 * At the end, resolve with fully-constructed employee info.
 * 
 * @returns { Promise }
 */
module.exports = (request) =>
    new Promise((resolve, reject) =>
        admin.auth()
            .verifyIdToken(request.get("Authorization").split("Bearer ")[1])
            .then(() => admin.database().ref("employees").child((request.query.id) - 1).once("value"))
            .then((employeeSnap) => employeeSnap.val())
            .then(employeeVal => resolve({
                ...employeeVal,
                age: `${employeeVal.first_name}'s age.`,
                birth_date: `${employeeVal.first_name}'s birth date.`,
                title: `${employeeVal.first_name}'s title.`,
                gender: `${employeeVal.first_name}'s gender.`,
                income_tax: `${employeeVal.first_name}'s income tax.`,
                national_insurance: `${employeeVal.first_name}'s national insurance.`,
                salary: `${employeeVal.first_name}'s salary.`,
                take_home: `${employeeVal.first_name}'s take home.`,
            }))
            .catch((error) => reject(error)));
