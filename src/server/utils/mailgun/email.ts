import * as mailgunLoader from 'mailgun-js';
import config from '../../config';

let mailgun = mailgunLoader({
    apiKey: config.mailgun.apiKey,
    domain: 'sandbox7e0b97b6c6594def825b8ca822704ec2.mailgun.org'
});

const sendEmail = (to: string, from: string, subject: string, content: string) => {
    // using 'content' instead of 'text' => can send html or text
    let data = {
        to,
        from,
        subject,
        text: content
    };
    return mailgun.messages().send(data); // sends a promise => async
};

export { sendEmail }