import { Router, Request, Response } from "express";
import Message from "../models/message.js";
import sequelize from "../config/connections.js";
import { authenticateToken } from "../middleware/auth.js"; // Import JWT authentication middleware

const router = Router();

// Ensure database connection before processing requests
const ensureDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection is active.");
  } catch (error) {
    console.error("Database connection failed in messageRoutes:", error);
    throw new Error("Database connection is closed.");
  }
};

// POST: Save the contact form data to the database
router.post("/messages", async (req: Request, res: Response) => {
  const { category, firstName, lastName, email, phone, comments } = req.body;

  try {
    // await ensureDatabaseConnection();
    const newMessage = await Message.create({
      category,
      firstName,
      lastName,
      email,
      phone,
      comments,
    });

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    return res.status(500).json({ error: "Failed to save the message" });
  }
});

// GET: Fetch all messages from the database (Protected Route)
router.get("/messages", authenticateToken, async (_req: Request, res: Response) => {
  try {
    await ensureDatabaseConnection();
    const messages = await Message.findAll({ order: [["createdAt", "DESC"]] });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// DELETE: Delete a message by ID (Protected Route)
router.delete("/messages/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    await ensureDatabaseConnection();
    const { id } = req.params;
    const deleted = await Message.destroy({ where: { id } });

    if (deleted) {
      res.status(200).json({ message: "Message deleted." });
    } else {
      res.status(404).json({ message: "Message not found." });
    }
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Failed to delete message." });
  }
});

export default router;
