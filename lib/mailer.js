import config from 'config';
import nodemailer from 'nodemailer';

const smtpConfig = config.get('app.smtpConfig');
let transporter = nodemailer.createTransport(smtpConfig);

class mailer{
    constructor(){
        this.isValidConfig=false;
    }
    verify(){
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                this.isValidConfig=false;                
            } else {
                this.isValidConfig=true;
                console.log('Server is ready to take our messages');
            }
        });
    }
    sendMail(mailOptions){
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return false;
            }
            console.log('Message sent: %s', info.messageId);
            return true;
        });
    }
} 

export default new mailer();


