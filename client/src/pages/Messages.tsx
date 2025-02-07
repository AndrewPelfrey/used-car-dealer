import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/messages.css";
// For use with the Employee page. This views the submitted information. Currently not hooked.

interface Message {
  id: number;
  firstName: string;
  lastName: string;
  category: string;
  email: string;
  phone: string;
  comments: string;
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/messages")
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: "DELETE",
      });
      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="messages-container">
      <h1>Messages</h1>
      {messages.length === 0 ? (
        <p>No messages available.</p>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="message-card">
            <div className="message-content">
              <p><strong>Name:</strong> {msg.firstName} {msg.lastName}</p>
              <p><strong>Category:</strong> {msg.category}</p>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Phone:</strong> {msg.phone}</p>
              <p><strong>Comments:</strong> {msg.comments}</p>
            </div>
            <button className="delete-button" onClick={() => handleDelete(msg.id)}>Delete</button>
          </div>
        ))
      )}

      {/* Redirect to home, but should go to the employee page instead */}
      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
};

export default Messages;