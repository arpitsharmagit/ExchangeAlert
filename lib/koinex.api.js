var request = require('cloudscraper');
const koinexdata = 'https://koinex.in/api/dashboards/ticker';

class koinexAPI {
    constructor() {
        this.isLogin = false;
    }
    getCurrentPrice() {
        return new Promise((resolve, reject) => {
            request.get(koinexdata, function (error, response, body) {
                if (error) {
                    reject(error);
                    console.log('Error occurred');
                } else {                    
                    resolve(JSON.parse(body));
                }
            })
        });

    }
}
export default new koinexAPI;