import admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://alerto-75d81.firebaseio.com"
});

function sendMesasge(registrationToken, title, body) {
    var payload = {
        notification: {
            title,
            body
        }
    };

    var options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    admin.messaging().sendToTopic("alerts", payload, options)
        .then(function (response) {
            console.log("Successfully sent message:", response);
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
        });
}
export default sendMesasge;