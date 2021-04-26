import { Router } from 'express';

import swaggerSpec from './core/utils/swagger';
import userRoutes from './app/user/user.route';
import deviceRoutes from './app/device/device.route';
import * as lnsNotificationService from './app/lnsNotification/lnsNotification.service';
import webpush from './webPush';
import logger from './core/utils/logger';

/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * GET /api/swagger.json.
 */
router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

/**
 * GET /api.
 */
router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

router.use('/users', userRoutes);
router.use('/devices', deviceRoutes);


router.post('/subscribe-notification', (req, res) => {
  const subscription = req.body;

  lnsNotificationService.subscribeNotification(subscription);
  res.status(201).json({});
});

export default router;
