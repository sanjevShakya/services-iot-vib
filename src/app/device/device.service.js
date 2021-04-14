import Boom from '@hapi/boom';
import _get from 'lodash.get';

import Device from './device.model';
import { IOT_DEVICE_RESTART, IOT_DEVICE_STATE } from '../../core/constants/topics';

/**
 * Get all devices.
 *
 * @returns {Promise}
 */
export function getAllDevices() {
  return Device.fetchAll();
}

/**
 * Get a device.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getDevice(id) {
  return new Device({ id })
    .fetch()
    .then((device) => device)
    .catch(Device.NotFoundError, () => {
      throw Boom.notFound('Device not found');
    });
}

/**
 * Get a device.
 *
 * @param   {Number|String}  metadataName
 * @returns {Promise}
 */
export function getDeviceByMetadataName(metadataName) {
  return new Device({ metadataId: metadataName })
    .fetch()
    .then((device) => device)
    .catch(Device.NotFoundError, () => {
      throw Boom.notFound('Device not found');
    });
}
/**
 * Get a device by MAC id.
 *
 * @param {Number|String}  macId
 * @param {boolean} throwErr
 * @returns {Promise}
 */
export function getDeviceByMacId(macId, throwErr = true) {
  return new Device({ macId })
    .fetch()
    .then((device) => device)
    .catch(Device.NotFoundError, () => {
      if (throwErr) {
        throw Boom.notFound('Device not found');
      }

      return null;
    });
}

/**
 * Create new device.
 *
 * @param   {Object}  device
 * @returns {Promise}
 */
export function createDevice(device) {
  return new Device(device).save();
}

/**
 * Update a device.
 *
 * @param   {Number|String}  id
 * @param   {Object}         device
 * @param {Object} mqttClient
 * @returns {Promise}
 */
export async function updateDevice(id, device, mqttClient) {
  const updatedDevice = await new Device({ id }).save(device);

  try {
    mqttClient.client.publish(IOT_DEVICE_STATE, JSON.stringify(getMqttPayloadDeviceState(device)));
  } catch (e) {
    // do nothing
  }

  return updatedDevice;
}

export function getMqttPayloadDeviceState(device) {
  const devicePayload = {
    deviceMACId: device.macId,
    stateVerified: true,
    minThreshold: device.minVibrationAmplitude,
    fiveMThreshold: device.maxVibrationAmplitude,
    tenSThreshold: device.tenSecondMaxVibrationAmplitude,
    tolerableSleep: device.tolerableSleepDuration
  };

  return devicePayload;
}

/**
 * Delete a device.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export async function deleteDevice(id, deviceData, mqttClient) {
  const device = await new Device({ id }).fetch().then((device) => device.destroy());

  try {
    const device = _get(deviceData, 'attributes', {});

    mqttClient.client.publish(IOT_DEVICE_RESTART, JSON.stringify(getMqttPayloadDeviceState(device)));
  } catch (e) {
    // do nothing
  }

  return device;
}
