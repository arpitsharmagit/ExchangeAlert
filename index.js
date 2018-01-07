import mailer from './lib/mailer';
import koinexApi from './lib/koinex.api';
import alertServer from './api/server';
import sendNotification from './lib/message.api';
import * as utils from './lib/utils';

async function main() {
    alertServer();
    // let currenPrice = await koinexApi.getCurrentPrice();
    // let title = 'Alerto: Price Alert',
    //     body = `Ripple: ${currenPrice.XRP}`, registerId = '';
    // console.log(`Ripple: ${currenPrice.XRP}`)
    // sendNotification(registerId, title, body);    
    // console.log("done!");
}
main();