import * as topics from '../../core/constants/topics';
import * as deviceService from '../device/device.service';
import _get from 'lodash.get';
import * as deviceConstant from '../../core/constants/deviceConstants';

const availableDevices = {};

export const fetchDeviceState = async (client, data) => {
  const deviceMacId = data.deviceMACId;

  if (deviceMacId) {
    let device = await deviceService.getDeviceByMacId(deviceMacId, false);

    if (device) {
      device = _get(device, 'attributes', {});

      const devicePayload =  deviceService.getMqttPayloadDeviceState(device)

      client.publish(topics.IOT_DEVICE_STATE, JSON.stringify(devicePayload));
    }
  }
};

export const handleDeviceData = async (client, data) => {
  const deviceMacId = data.deviceMACId;
  const dataPeriod = Number(data.period);

  if (deviceMacId) {
    switch (dataPeriod) {
      case deviceConstant.PERIOD_FIVE_MINUTES:
        // handleFiveMinuteDeviceData(client, data);
        break;
      case deviceConstant.PERIOD_TEN_SECONDS:
        handleTenSecondDeviceData(client, data);
        break;
    }
  }
};

// async function handleFiveMinuteDeviceData(client, data) {
//   let device =  await deviceService.getDeviceByMacId(data.deviceMacId, false);
//   device = _get(device, 'attributes', {});
// }

async function handleTenSecondDeviceData(client, data) {
  let device = await deviceService.getDeviceByMacId(data.deviceMACId, false);

  device = _get(device, 'attributes', {});
  client.publish(`${topics.IOT_DEVICE_DATA}/${device.metadataId}`, JSON.stringify(data));
}

export async function handleDeviceState(client, data) {
  if (data && data.deviceMACId) {
    let device = await deviceService.getDeviceByMacId(data.deviceMACId, false);

    device = _get(device, 'attributes', {});
    client.publish(`${topics.IOT_DEVICE_STATE}/${device.metadataId}`, JSON.stringify(data));
  }
}

export const generateUnverifiedAvailableDevices = async (client, data, topic) => {
  const deviceMacId = data.deviceMACId;

  if (deviceMacId) {
    const device = await deviceService.getDeviceByMacId(deviceMacId, false);

    if (device) {
      const verifiedPayload = {
        deviceMACId: deviceMacId,
        verified: true
      };

      delete availableDevices[deviceMacId];

      return client.publish(topics.IOT_BROADCAST_VERIFY, JSON.stringify(verifiedPayload));
    } else {
      availableDevices[deviceMacId] = data;

      return client.publish(topics.IOT_UNVERIFIED_AVAILABLE_DEVICES, JSON.stringify(availableDevices));
    }
  }
};
