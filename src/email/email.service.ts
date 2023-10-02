import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as cacheManager from 'cache-manager';
import UsersEntity from 'src/entities/auth.entity';
@Injectable()
export class EmailService {
  private transporter;
  private cache;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    this.cache = cacheManager.caching({
      store: 'memory',
      ttl: 30,
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {

    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(error);
    }
  }
  async generateVerificationCode(email: string) {

    let rand = "";
    for(let i = 0; i < 6; ++i){
      const a = Math.floor(Math.random() * 10);
    
      rand += `${a}`;
    };
    const verificationCode = rand;
    await this.cache.set(email, verificationCode, { ttl: 30 });
    return verificationCode;
  }
  
  async checkVerificationCode(email: string, code: string): Promise<boolean> {
    const storedCode = await this.cache.get(email);
    if (storedCode && code === storedCode) {
      await this.cache.del(email);
      return true;
    }
    return false;
  }
}
