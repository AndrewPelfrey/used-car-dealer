import { Router } from "express";
import Message from "../models/message";

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
router.get("/messages", async (req, res) => {
    // Destructure the query parameters from req.query
    const { category, firstName, lastName, email, phone } = req.query;
  
    // Log the query parameters to check if they are being passed correctly
    console.log("Query parameters:", req.query);
  
    try {
      // Construct the where conditions dynamically based on the query parameters
      const whereConditions: any = {};  // Will hold conditions to filter messages
  
      // Add filtering conditions if they are present in the query parameters
      if (category) {
        whereConditions.category = category;
      }
  
      if (firstName) {
        whereConditions.firstName = firstName;
      }
  
      if (lastName) {
        whereConditions.lastName = lastName;
      }
  
      if (email) {
        whereConditions.email = email;
      }
  
      if (phone) {
        whereConditions.phone = phone;
      }
  
      // Fetch messages from the database with optional filters
      const messages = await Message.findAll({
        where: whereConditions,  // Apply the filtering conditions
      });
  
      if (messages.length === 0) {
        return res.status(404).json({ message: "No messages found" });
      }
  
      // Send the filtered messages as the response
      return res.status(200).json(messages);
    } catch (error) {
      console.error("Error retrieving messages:", error);
      return res.status(500).json({ error: "Failed to retrieve messages" });
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
