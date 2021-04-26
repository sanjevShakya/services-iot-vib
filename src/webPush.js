import webpush from 'web-push';

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails('mailto:test@lnstest.com', publicVapidKey, privateVapidKey);

export default webpush;
