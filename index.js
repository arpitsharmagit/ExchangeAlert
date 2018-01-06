import mailer from './lib/mailer';
import koinexApi from './lib/koinex.api';
import sendNotification from './lib/message.api';

function sleep(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    })
};
async function main() {
    let currenPrice = await koinexApi.getCurrentPrice();
    console.log(`Ripple: ${currenPrice.XRP}`)
    let count = 0;
    while (count < 10) {
        count++;    
        await sleep(5);
        currenPrice = await koinexApi.getCurrentPrice();      
        console.log(`Ripple: ${currenPrice.XRP}`)  
        const title = 'Alerto: Price Alert',
            body = `Ripple: ${currenPrice.XRP}`, registerId = '';
        sendNotification(registerId, title, body);
    } 
    console.log("done!");


    // if (currenPrice) {
    //     let mailOptions = {
    //         from: '"Arpit Mailer" <arpitsharma401628@gmail.com>', // sender address
    //         to: 'arpitsharma1282@gmail.com', // list of receivers
    //         subject: 'Hello Dude ✔', // Subject line
    //         text: `BitCoin => ${currenPrice.BTC}\n Ripple => ${currenPrice.XRP}\n Ether => ${currenPrice.ETH}\n BitCash => ${currenPrice.BCH} \nLiteCoin => ${currenPrice.LTC}`, // plain text body
    //         html: `BitCoin => ${currenPrice.BTC}<br> Ripple => ${currenPrice.XRP}<br> Ether => ${currenPrice.ETH}<br> BitCash => ${currenPrice.BCH} <br>LiteCoin => ${currenPrice.LTC}` // html body
    //     };
    //     mailer.sendMail(mailOptions);
    // }
}
main();