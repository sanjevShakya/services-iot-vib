import Joi from '@hapi/joi';

import validate from '../../core/utils/validate';
import * as deviceService from './device.service';

// Validation schema
const schema = Joi.object({
  name: Joi.string().label('Name').max(90).required(),
  isVerified: Joi.boolean().label('Verified Device').required(),
  macId: Joi.string().label('Mac Address').max(90).required(),
  maxVibrationAmplitude: Joi.number().label('5 min Max Vibration Amplitude').required(),
  tenSecondMaxVibrationAmplitude: Joi.number().label('10 second max vibration amplitude').required(),
  metadataId: Joi.string().label('Metadata').required(),
  offset: Joi.number().label('Min Vibration Amplitude').required(),
  tolerableSleepDuration: Joi.number().label('Tolerable Sleep Duration').required()
});

/**
 * Validate create/update device request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function deviceValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate devices existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findDevice(req, res, next) {
  return deviceService
    .getDevice(req.params.id)
    .then((data) => {
      req.device = data;
      next();
    })
    .catch((err) => next(err));
}

export { findDevice, deviceValidator };
