export const IOT_VERIFY = 'iot-vib/verify';
export const IOT_BROADCAST = 'iot-vib/broadcast';
export const IOT_BROADCAST_VERIFY = 'iot-vib/broadcast/verify';
export const IOT_UNVERIFIED_AVAILABLE_DEVICES = 'iot-vib/unverified-available-devices';
export const IOT_DEVICE_STATE = 'iot-vib/broadcast/state/verify';
export const IOT_DEVICE_GET_STATE = 'iot-vib/broadcast/state';
export const IOT_DEVICE_DATA = 'iot-vib/data';
export const IOT_DEVICE_STATUS = 'iot-vib/current-state/five-s';
export const IOT_DEVICE_RESTART = 'iot-vib/device-restart';
export const IOT_DEVICE_CALIBRATE = 'iot-vib/calibrate';
export const IOT_DEVICE_NOTIFICATION = 'iot-vib/notification';

export const TOPIC_CONFIG = {
  [IOT_BROADCAST]: {
    shouldSubscribe: true,
    name: IOT_BROADCAST
  },
  [IOT_VERIFY]: {
    shouldSubscribe: true,
    name: IOT_VERIFY
  },
  [IOT_DEVICE_GET_STATE]: {
    shouldSubscribe: true,
    name: IOT_DEVICE_GET_STATE
  },
  [IOT_DEVICE_STATUS]: {
    shouldSubscribe: true,
    name: IOT_DEVICE_STATUS
  }
};

export const TOPICS = [
  IOT_BROADCAST,
  IOT_VERIFY,
  IOT_DEVICE_GET_STATE,
  IOT_DEVICE_DATA,
  IOT_DEVICE_STATUS,
  IOT_DEVICE_NOTIFICATION
];
