import { Router } from 'express';
import { logVisit } from '../controllers/analyticsController.js';

const router = Router();

router.post('/visit', logVisit);

export default router;
