"use strict"

const assert = require("assert");
const rp = require("request-promise");

const getAll = require("../../src/getAll");
const configs = require("../shared/configs");

const TEST_USER = {
    email: null,
    pw: null
};

describe("Integration tests for the 'getAll' function.", () =>
    describe("Should test getting all the employees from the backend service.", () =>
        it("Will fetch all the employees, and verify that the response array length is greater than zero.", () =>
            rp({
                method: "POST",
                uri: configs.IDENTITY_SERVICE + '?key=' + configs.API_KEY,
                body: {
                    email: TEST_USER.email || process.env.TEST_USERNAME,
                    password: TEST_USER.pw || process.env.TEST_PASSWORD,
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
        )
    )
);
