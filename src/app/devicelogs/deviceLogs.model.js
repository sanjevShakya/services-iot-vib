import db from '../../db';

const TABLE_NAME = 'device_logs';

/**
 * DeviceLog model.
 */
class DeviceLog extends db.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Table has timestamps.
   */
  get hasTimestamps() {
    return true;
  }
}

export default DeviceLog;
