import Boom from '@hapi/boom';

import DeviceLogs from './deviceLogs.model';

/**
 * Get all devicelogs.
 *
 * @returns {Promise}
 */
export function getAllDeviceLogs() {
  return DeviceLogs.fetchAll();
}

/**
 * Get a devicelog.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getDeviceLog(id) {
  return new DeviceLogs({ id })
    .fetch()
    .then((devicelog) => devicelog)
    .catch(DeviceLogs.NotFoundError, () => {
      throw Boom.notFound('DeviceLogs not found');
    });
}

/**
 * Get a devicelog by MAC id.
 *
 * @param {Number|String}  macId
 * @param {boolean} throwErr
 * @returns {Promise}
 */
export function getDeviceByMacId(macId, throwErr = true) {
  return new DeviceLogs({ macId })
    .fetch()
    .then((devicelog) => devicelog)
    .catch(DeviceLogs.NotFoundError, () => {
      if (throwErr) {
        throw Boom.notFound('DeviceLogs not found');
      }

      return null;
    });
}

/**
 * Create new devicelog.
 *
 * @param   {Object}  devicelog
 * @returns {Promise}
 */
export function createDeviceLog(devicelog) {
  return new DeviceLogs(devicelog).save();
}
