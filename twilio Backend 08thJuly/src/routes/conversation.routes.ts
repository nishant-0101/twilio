import { Router } from 'express';
import { createConversation, addParticipant, sendTemplate, sendPlainTemplateMessage, sendGroupMessage, createOrFetchConversation } from '../controllers/conversation.controller';

const router = Router();

// router.post('/initiate', initiateConversation);
router.post('/createConversation', createOrFetchConversation);
router.post('/create', createConversation);
router.post('/addParticipant', addParticipant);
router.post('/sendTemplate', sendTemplate);
router.post('/sendPlainTemplateMessage', sendPlainTemplateMessage);
router.post('/sendMessage', sendGroupMessage);

export default router;