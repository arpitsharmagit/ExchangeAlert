import admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json';
import mongoose from 'mongoose';
const Alert = mongoose.model('Alerts');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://alerto-75d81.firebaseio.com"
});

function getDeviceIds() {
    return new Promise((resolve, reject) => {
        Alert.find({}, function (err, alert) {
            if (err)
                reject([]);
            const ids = alert.map(a => a.deviceId);
            resolve(ids);
        });
    });

}
async function sendMesasge(title, body) {
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
    const devices =await getDeviceIds();
    console.log(devices);
    admin.messaging().sendToDevice(devices, payload, options)
        .then(function (response) {
            console.log("Successfully sent message:", response);
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
        });
}
export default sendMesasge;