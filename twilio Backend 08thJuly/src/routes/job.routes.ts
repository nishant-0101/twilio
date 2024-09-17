import { Router } from 'express';
// import { initiateConversation } from '../controllers/messaging.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

// router.post('/initiate', authenticateJWT, initiateConversation);

export default router;
