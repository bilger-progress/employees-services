"use strict"

const assert = require("assert");
const rp = require("request-promise");

// Import the function to be tested.
const getAll = require("../../src/getAll");

// Load all needed configs.
const configs = require("../shared/configs");

/**
 * Integration test scenaio.
 * The test execution times-out in 10s.
 */
describe("Integration tests for the 'getAll' function.", () =>
    describe("Should test getting all the employees from the backend service.", () =>
        it("Will fetch all the employees, and verify that the response array length is greater than zero.", () =>
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
                    uri: configs.SERVICE_URL + "/getAll",
                    json: true,
                    headers: {
                        "Authorization": `Bearer ${response.idToken}`,
                        "Content-Type": "application/json"
                    }
                }))
                .then(serviceResponse => assert.notEqual(serviceResponse.length, 0))
                .catch(error => assert.fail(error))
        ).timeout(10000)
    )
);
