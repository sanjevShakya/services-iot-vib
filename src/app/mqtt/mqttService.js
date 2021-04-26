import * as topics from '../../core/constants/topics';
import * as deviceService from '../device/device.service';
import _get from 'lodash.get';
import * as deviceLogService from '../devicelogs/deviceLogs.service';
import * as notificationService from '../lnsNotification/lnsNotification.service';

const availableDevices = {};

export const fetchDeviceState = async (client, data) => {
  const deviceMacId = data.deviceMACId;

  if (deviceMacId) {
    let device = await deviceService.getDeviceByMacId(deviceMacId, false);

    if (device) {
      device = _get(device, 'attributes', {});

      const devicePayload = deviceService.getMqttPayloadDeviceState(device);

      client.publish(topics.IOT_DEVICE_STATE, JSON.stringify(devicePayload));
    }
  }
};

function prepareDeviceLogPayload(data) {
  return {
    macId: data.deviceMACId,
    deviceState: data.deviceState,
    ax: data.ax,
    ay: data.ay,
    az: data.az,
    mean: data.mean,
    comparedMean: data.comparedMean,
    period: data.period,
    tenSecondMaxVibrationAmplitude: data.tenSThreshold,
    fiveMinuteMaxVibrationAmplitude: data.fiveMThreshold
  };
}

function mapMqttDataKeys(data) {
  return {
    deviceMACId: data.macId,
    deviceState: data.ds,
    ax: data.ax,
    ay: data.ay,
    az: data.az,
    mean: data.mean,
    comparedMean: data.cm,
    period: data.p,
    tenSThreshold: data.tenSTh,
    fiveMThreshold: data.fiveMTh,
    offset: data.ofst
  };
}

export const handleDeviceData = async (client, data) => {
  data = mapMqttDataKeys(data);
  let device = await deviceService.getDeviceByMacId(data.deviceMACId, false);

  device = _get(device, 'attributes', {});

  if (process.env.APP_LOG_STATUS === 'START') {
    deviceLogService.createDeviceLog(prepareDeviceLogPayload(data));
  }

  client.publish(`${topics.IOT_DEVICE_DATA}/${device.metadataId}`, JSON.stringify(data));
};

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

      return client.publish(topics.IOT_BROADCAST_VERIFY, JSON.stringify(verifiedPayload), { qos: 2 });
    } else {
      availableDevices[deviceMacId] = data;

      return client.publish(topics.IOT_UNVERIFIED_AVAILABLE_DEVICES, JSON.stringify(availableDevices));
    }
  }
};

export const handleDeviceNotification = async (client, data, topic) => {
  const deviceMacId = data.deviceMACId;

  if (deviceMacId && data.ds == 'TRUEOFF') {
    const device = await deviceService.getDeviceByMacId(deviceMacId, false);

    const deviceData = _get(device, 'attributes', {});

    notificationService.sendNotification(deviceData);
  }
};
