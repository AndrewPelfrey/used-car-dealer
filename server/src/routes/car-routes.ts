import express from "express";
import { authenticateToken } from "../middleware/auth";


const router = express.Router();

router.post('/cars', authenticateToken,)
router.delete('/cars/:id', authenticateToken)

export default router;