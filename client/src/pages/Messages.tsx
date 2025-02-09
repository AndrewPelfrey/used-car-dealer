import React, { useEffect, useState } from "react";
import "../styles/contact.css";

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/messages");
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error("Failed to fetch messages.");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const response = await fetch(`http://localhost:3001/api/messages/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Message deleted.");
          setMessages(messages.filter((message) => message.id !== id));
        } else {
          console.error("Failed to delete message.");
        }
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  return (
    <div className="contact-form-container">
      <h1>Submitted Messages</h1>
      <div className="messages-list">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id} className="contact-message">
              <h3>
                {message.firstName} {message.lastName}
              </h3>
              <p>Email: {message.email}</p>
              <p>Phone: {message.phone}</p>
              <p>Category: {message.category}</p>
              <p>Comments: {message.comments}</p>
              <button onClick={() => handleDelete(message.id)} className="delete-btn">
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
