import webpush from '../../webPush';

const subscriptionList = [];

export function sendNotification(device) {
  const payload = { title: `${device.name} is available to use.` };

  subscriptionList.map((subscription) => {
    return webpush.sendNotification(subscription, JSON.stringify(payload)).catch((err) => {
      console.error(err);
    });
  });
}

export function subscribeNotification(subscription) {
  subscriptionList.push(subscription);

  return true;
}
