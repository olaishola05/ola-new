import jwt from 'jsonwebtoken';

class TokenService {
  private secretKey: string;

  constructor() {
    this.secretKey = process.env.JWT_SECRET || 'your-secret-key';
  }

  generateToken(payload: object, expiresIn: string | number = '7d'): string {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  verifyToken(token: string): object | string {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}


export default TokenService;
