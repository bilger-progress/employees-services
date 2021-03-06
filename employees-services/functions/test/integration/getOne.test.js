"use strict"

const assert = require("assert");
const rp = require("request-promise");

// Import the function to be tested.
const getOne = require("../../src/getOne");

// Load all needed configs.
const configs = require("../shared/configs");

/**
 * Integration test scenaio.
 * The test execution times-out in 10s.
 */
describe("Integration tests for the 'getOne' function.", () =>
    describe("Should test getting an employee from the backend service.", () =>
        it("Will fetch the employee, and verify that the response object has properties.", () =>
            rp({
                method: "POST",
                uri: configs.IDENTITY_SERVICE + '?key=' + configs.API_KEY,
                body: {
                    email: configs.TEST_USER.EMAIL || process.env.TEST_USERNAME,
                    password: configs.TEST_USER.PASSWORD || process.env.TEST_PASSWORD,
                    returnSecureToken: true
                },
                json: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => rp({
                    method: "GET",
                    uri: configs.SERVICE_URL + "/getOne?id=" + configs.TEST_EMPLOYEE_ID,
                    json: true,
                    headers: {
                        "Authorization": `Bearer ${response.idToken}`,
                        "Content-Type": "application/json"
                    }
                }))
                .then(serviceResponse => assert.notEqual(Object.keys(serviceResponse).length, 0))
                .catch(error => assert.fail(error))
        ).timeout(10000)
    )
);
