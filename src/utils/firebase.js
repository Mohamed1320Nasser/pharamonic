const admin = require('firebase-admin');
const serviceAccount = require('../../config/puch_notification_key.json');
const certPath = admin.credential.cert(serviceAccount);
admin.initializeApp({
    credential: admin.credential.cert(certPath),
});
module.exports =admin
