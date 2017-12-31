import mailer from './lib/mailer';
import koinexApi from './lib/koinex.api';

async function main() {
    const currenPrice = await koinexApi.getCurrentPrice();
    if (currenPrice) {
        let mailOptions = {
            from: '"Arpit Mailer" <arpitsharma401628@gmail.com>', // sender address
            to: 'arpitsharma1282@gmail.com', // list of receivers
            subject: 'Hello Dude ✔', // Subject line
            text: `BitCoin => ${currenPrice.BTC}\n Ripple => ${currenPrice.XRP}\n Ether => ${currenPrice.ETH}\n BitCash => ${currenPrice.BCH} \nLiteCoin => ${currenPrice.LTC}`, // plain text body
            html: `BitCoin => ${currenPrice.BTC}<br> Ripple => ${currenPrice.XRP}<br> Ether => ${currenPrice.ETH}<br> BitCash => ${currenPrice.BCH} <br>LiteCoin => ${currenPrice.LTC}` // html body
        };
        mailer.sendMail(mailOptions);
    }
}
main();