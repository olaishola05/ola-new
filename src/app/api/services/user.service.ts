import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from "@/app/lib/prisma";
import OtpService from './otp.service';
const JWT_SECRET = process.env.JWT_SECRET as string;

interface RegisterResult {
  data?: {
    otp: string;
    id: string;
  };
  errors?: {
    message: string;
  };
}

class AuthService {
  static async register(name: string, email: string, password: string): Promise<RegisterResult> {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return {
          errors: {
            message: 'User with this email already exists'
          }
        }
      }

      const hashedPassword = await OtpService.generateHash(password);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      });
      const otp = OtpService.generateOtp();
      await OtpService.createOtp(user.id, otp);
      return {
        data: {
          otp,
          id: user.id
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during registration';
      return {
        errors: {
          message: errorMessage
        }
      };
    }
  }

  static async login(email: string, password: string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await this.comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    return token;
  }

  static async requestPasswordReset(email: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const otp = OtpService.generateOtp();
    await OtpService.createOtp(user.id, otp);

    // Send OTP via email/SMS (implementation not shown)
    console.log(`Password reset OTP for user ${user.id}: ${otp}`);
  }

  static async resetPassword(email: string, otp: string, newPassword: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isValid = await OtpService.verifyOtp(user.id, otp);

    if (!isValid) {
      throw new Error('Invalid or expired OTP');
    }

    const hashedPassword = await OtpService.generateHash(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
  }

  static async authenticate(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      return decoded.userId;
    } catch (err) {
      throw new Error('Invalid token');
    }
  }

  static async comparePasswords(password: string, savedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, savedPassword);
    return isMatch;
  }

  static async findUserById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }
}

export default AuthService;