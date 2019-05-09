const functions = require('firebase-functions');

const getAll = require("./src/getAll.js");
const getOne = require("./src/getOne.js");

exports.getAll = functions.https.onRequest((request, response) => {
    return handleHTTPS(request, response, getAll);
});

exports.getOne = functions.https.onRequest((request, response) => {
    return handleHTTPS(request, response, getOne);
});

function handleHTTPS(request, response, handler) {
    return handler(request)
        .then((data) => {
            return response.status(200).json(data);
        });
}
