'use server'

import OtpService from '../app/api/services/otp.service';

interface FormState {
  success: boolean;
  message?: string;
}

export async function verifyOtp(userId: string, otp: string[]): Promise<FormState> {
  try {
    const result = await OtpService.verifyOtp(userId, otp.join(''));
    if (result.isValid) {
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