const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({
    origin: true,
});

// Import the main handlers.
const getAll = require("./src/getAll.js");
const getOne = require("./src/getOne.js");

function initializeFirebaseAdminSDK(firebaseAdminSDKConfig) {
    firebaseAdminSDKConfig.private_key = firebaseAdminSDKConfig.private_key
        .replace(new RegExp("space", "g"), " ")
        .replace(/\\n/g, "\n");
    admin.initializeApp({
        credential: admin.credential.cert(firebaseAdminSDKConfig),
        databaseURL: "https://employees-70f8e.firebaseio.com"
    });
}
initializeFirebaseAdminSDK(functions.config().admin);

// Export Firebase Cloud Functions.
exports.getAll = functions.https.onRequest((request, response) =>
    cors(request, response, () => handleHTTPS(request, response, getAll)));

exports.getOne = functions.https.onRequest((request, response) =>
    cors(request, response, () => handleHTTPS(request, response, getOne)));

// Re-usable Cloud Function Handler.
function handleHTTPS(request, response, handler) {
    return handler(request)
        .then(data => response.status(200).json(data))
        .catch(error => response.status(400).json({ error: error.message }));
}
