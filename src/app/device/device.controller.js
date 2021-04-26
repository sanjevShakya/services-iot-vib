import HttpStatus from 'http-status-codes';

import * as deviceService from './device.service';

/**
 * Get all devices.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  deviceService
    .getAllDevices()
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
  deviceService
    .getDevice(req.params.id)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

export function fetchByMetadataName(req, res, next) {
  deviceService
    .getDeviceByMetadataName(req.params.name)
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
  deviceService
    .createDevice(req.body)
    .then((data) => res.status(HttpStatus.CREATED).json({ data }))
    .catch((err) => next(err));
}

/**
 * Update a device.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function update(req, res, next) {
  deviceService
    .updateDevice(req.params.id, req.body, req.mqttClient)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Delete a device.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function deleteDevice(req, res, next) {
  deviceService
    .deleteDevice(req.params.id, req.device, req.mqttClient)
    .then((data) => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch((err) => next(err));
}

/**
 * Delete a device.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function restartDevice(req, res, next) {
  deviceService
    .restartDevice(req.params.id, req.mqttClient)
    .then((data) => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch((err) => next(err));
}


/**
 * Delete a device.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
 export function calibrateDevice(req, res, next) {
  deviceService
    .calibrateDevice(req.body, req.mqttClient)
    .then((data) => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch((err) => next(err));
}
