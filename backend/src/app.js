import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

const app = express();

app.use(
  cors({
    origin: env.nodeEnv === 'production' ? env.frontendOrigin : true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'x-admin-token']
  })
);
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Portfolio backend is running.' });
});

app.use('/api/inquiries', inquiryRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
