'use server'

import OtpService from '../app/api/services/otp.service';
import AuthService from '../app/api/services/user.service';
import { sendWelcomeEmail } from '../app/api/utils';

interface FormState {
  success: boolean;
  message?: string;
}

export async function verifyOtp(userId: string, otp: string[]): Promise<FormState> {
  try {
    const result = await OtpService.verifyOtp(userId, otp.join(''));
    if (result.isValid) {
      const user = await AuthService.findUserById(userId);
      if (!user) {
        return { success: false, message: 'User not found' };
      }
      const { data, error } = await sendWelcomeEmail({ name: user.name!, email: user.email! })
      if (error) {
        return { success: false, message: 'Error sending welcome email' };
      }
      return { success: true, message: 'OTP verification successful' };
    }
    if (result.errors) {
      return { success: false, message: result.errors.message };
    }
    return { success: false, message: 'OTP verification failed' };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return { success: false, message: (error as Error).message };
  }
}