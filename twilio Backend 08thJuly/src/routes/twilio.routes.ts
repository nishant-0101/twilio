// src/routes/twilio.routes.ts

import { Router } from 'express';
import { TwilioController } from '../controllers/twilio.controller';

const router = Router();
const twilioController = new TwilioController();

router.get('/token', (req, res) => twilioController.getToken(req, res));

export default router;
