import { Request, Response } from 'express';
import { User } from '../entities/user';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/typeorm.config';
import { generateToken } from '../utils/generateToken';
import { Twilio } from 'twilio';

const client = new Twilio(
    process.env.TWILIO_ACCOUNT_SID as string,
    process.env.TWILIO_AUTH_TOKEN as string
  );
// const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const userRepository = AppDataSource.getRepository(User);

export const sendOTP = async (req: Request, res: Response) => {
  console.log('sendOTP body:', req.body);
  const { phoneNumber } = req.body;

  try {
    await client.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID as string)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' });

    res.status(200).json({ message: 'OTP sent' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  console.log('verifyOTP body:', req.body);
  const { phoneNumber, code } = req.body;

  try {
    const verificationCheck = await client.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID as string)
      .verificationChecks
      .create({ to: phoneNumber, code });

    if (verificationCheck.status === 'approved') {
      let user = await userRepository.findOneBy({ phoneNumber });

      if (!user) {
        return res.status(200).json({ newUser: true, message: 'OTP verified, please provide additional details' });
      } else {
        const { twilioToken, refreshToken } = generateToken(user.phoneNumber);

        // Store the refresh token in the database (or secure location)
        user.refreshToken = refreshToken;
        await userRepository.save(user);

        return res.status(200).json({
          twilioToken,
          refreshToken,
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          userType: user.userType
        });
      }
    } else {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const updateUserDetails = async (req: Request, res: Response) => {
  console.log('updateUserDetails body:', req.body);
  const { phoneNumber, firstName, lastName, userType, email } = req.body;

  try {
    let user = await userRepository.findOneBy({ phoneNumber });

    if (!user) {
      // New user case, create a new user with the provided details
      user = userRepository.create({ phoneNumber, firstName, lastName, userType, email });
      await userRepository.save(user);
    } else {
      // Existing user case, update the user details
      user.firstName = firstName;
      user.lastName = lastName;
      user.userType = userType;
      user.email = email;
      await userRepository.save(user);
    }

    // Generate both Twilio token and refresh token
    const { twilioToken, refreshToken } = generateToken(user.phoneNumber);

    // Store the refresh token
    user.refreshToken = refreshToken;
    await userRepository.save(user);

    res.status(200).json({
      twilioToken,
      refreshToken,
      userId: user.id,
      firstName,
      lastName,
      userType
    });
  } catch (err: any) {
    console.error('Error updating user details:', err);
    res.status(500).json({ error: err.message });
  }
};


export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    // Verify the refresh token
    const decoded: any = jwt.verify(refreshToken, process.env.JWT_SECRET as string);
    const phoneNumber = decoded.phoneNumber;

    // Find the user associated with the refresh token
    const user = await userRepository.findOneBy({ phoneNumber, refreshToken });

    if (!user) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Generate new tokens
    const { twilioToken, refreshToken: newRefreshToken } = generateToken(phoneNumber);

    // Update the refresh token in the database
    user.refreshToken = newRefreshToken;
    await userRepository.save(user);

    // Return the new tokens
    return res.status(200).json({ twilioToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};


