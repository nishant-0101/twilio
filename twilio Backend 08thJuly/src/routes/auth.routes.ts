import { Router } from 'express';
import { sendOTP, verifyOTP, updateUserDetails, refreshToken } from '../controllers/auth.controller';

const router = Router();

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/update-user-details', updateUserDetails);
router.post('/refresh-token', refreshToken);

export default router;
