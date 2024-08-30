import prisma from "@/app/lib/prisma";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

interface OtpVerificationResult {
  errors?: {
    message: string;
  };
  isValid: boolean;
}

class OtpService {
  private static OTP_LENGTH = 6;
  private static OTP_EXPIRY_MINUTES = 60;

  static generateOtp(): string {
    return crypto.randomInt(0, 999999).toString().padStart(OtpService.OTP_LENGTH, '0')
  }

  static async generateHash(otp: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(otp, salt)
  }

  static async createOtp(userId: string, otp: string): Promise<void> {
    const hashedOtp = await this.generateHash(otp);
    const expiresAt = new Date(Date.now() + this.OTP_EXPIRY_MINUTES * 60 * 1000)

    await prisma.otp.create({
      data: {
        userId,
        otp: hashedOtp,
        expiresAt,
      }
    })
  }

  static async verifyOtp(userId: string, otp: string): Promise<OtpVerificationResult> {
    try {
      const storedOtp = await this.getLatestValidOtp(userId);
      if (!storedOtp) {
        return this.createErrorResult('OTP not found or expired');
      }
      const isOtpValid = await this.isOtpValid(otp, storedOtp.otp);
      if (isOtpValid) {
        await this.markUserAsVerified(userId);
        await this.removeVerifiedUserOtps(userId);
        return { isValid: true };
      }

      return this.createErrorResult('Invalid OTP');
    } catch (error) {
      if (error instanceof Error) {
        return this.createErrorResult(`Verification error: ${error.message}`);
      }
      return this.createErrorResult('An unexpected error occurred while verifying OTP');
    }
  }

  private static async getLatestValidOtp(userId: string) {
    return prisma.otp.findFirst({
      where: {
        userId,
        expiresAt: { gte: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  private static async isOtpValid(inputOtp: string, storedOtp: string): Promise<boolean> {
    return bcrypt.compare(inputOtp, storedOtp);
  }

  private static async markUserAsVerified(userId: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return;
    }

    if (user?.emailVerified) {
      return;
    }
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  private static createErrorResult(message: string): OtpVerificationResult {
    return { errors: { message }, isValid: false };
  }

  static async removeVerifiedUserOtps(userId: string): Promise<void> {
    await prisma.otp.deleteMany({
      where: {
        userId,
        expiresAt: {
          gte: new Date(),
        }
      }
    })
    await this.removeExpiredOtps()
  }

  static async removeExpiredOtps(): Promise<void> {
    await prisma.otp.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        }
      }
    })
  }
}

export default OtpService;