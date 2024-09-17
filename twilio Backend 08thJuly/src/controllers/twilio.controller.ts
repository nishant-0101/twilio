// src/controllers/twilio.controller.ts

import { Request, Response } from 'express';
import { TwilioService } from '../services/twilio.service';

export class TwilioController {
  private twilioService: TwilioService;

  constructor() {
    this.twilioService = new TwilioService();
  }

  getToken(req: Request, res: Response): void {
    try {
      const identity = req.query.identity as string;
      const token = this.twilioService.generateToken(identity);
      res.status(200).json({ identity, token });
    } catch (error) {
      res.status(500).json({ message: 'Failed to generate token', error });
    }
  }
}
