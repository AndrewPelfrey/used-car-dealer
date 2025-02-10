import { Router } from "express";
import Message from "../models/message.js";

const router = Router();

// POST: Save the contact form data to the database
router.post("/messages", async (req, res) => {
    const { category, firstName, lastName, email, phone, comments } = req.body;
  
    try {
      // Create the new message in the database
      const newMessage = await Message.create({
        category,
        firstName,
        lastName,
        email,
        phone,
        comments,
      });
  
      // Respond with the created message
      return res.status(201).json(newMessage);  // Returning the new message
    } catch (error) {
      console.error("Error saving message:", error);
      return res.status(500).json({ error: "Failed to save the message" });
    }
  });

// GET: Fetch all messages from the database
router.get('/', async (req, res) => {
  try {
    const messages = await Message.findAll({ order: [['createdAt', 'DESC']] });
    res.json(messages);
    console.log("Query parameters:", req.query);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});
  

// DELETE: Delete a message by ID
router.delete("/messages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Message.destroy({ where: { id } });

    if (deleted) {
      res.status(200).json({ message: "Message deleted." });
    } else {
      res.status(404).json({ message: "Message not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete message." });
  }
});

export default router;
