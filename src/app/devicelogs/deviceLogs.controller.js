import HttpStatus from 'http-status-codes';

import * as deviceLogService from './deviceLogs.service';

/**
 * Get all devices.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  deviceLogService
    .getAllDeviceLogs()
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Get a device by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchById(req, res, next) {
  deviceLogService
    .getDeviceLog(req.params.id)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Create a new device.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  deviceLogService
    .createDeviceLog(req.body)
    .then((data) => res.status(HttpStatus.CREATED).json({ data }))
    .catch((err) => next(err));
}
