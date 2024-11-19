import express from 'express';
import AppController from '../controllers/AppController.js';

const router = express.Router();

// Define endpoints
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

export default router;
