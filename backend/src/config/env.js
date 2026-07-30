import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, '../../');

export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  databaseFile: process.env.DATABASE_FILE
    ? path.resolve(backendRoot, process.env.DATABASE_FILE)
    : path.resolve(backendRoot, 'database/portfolio.sqlite'),
  adminToken: process.env.ADMIN_TOKEN || '',
  emailUser: process.env.EMAIL_USER || '',
  emailPass: process.env.EMAIL_PASS || '',
  receiverEmail: process.env.RECEIVER_EMAIL || '',
  resendApiKey: process.env.RESEND_API_KEY || '',
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
  telegramChatId: process.env.TELEGRAM_CHAT_ID || ''
};
