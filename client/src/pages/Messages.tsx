import React, { useEffect, useState } from "react";
import "../styles/contact.css";

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token"); // Retrieve JWT token from storage
      // Remove this once it's confirmed
      console.log("Sending token:", token);

      try {
        const response = await fetch("/api/messages", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch messages. Status: ${response.status}`);
        }

        const text = await response.text();
        console.log("Raw Response:", text);
        //console.log("Fetched Messages:", data);
        const data = JSON.parse(text);
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to fetch messages. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    const token = localStorage.getItem("token"); // Retrieve JWT token for delete request

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (response.ok) {
        setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
      } else {
        console.error("Failed to delete message.");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="contact-form-container">
      <h1>Submitted Messages</h1>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length > 0 ? (
        <div className="messages-list">
          {messages.map((message) => (
            <div key={message.id} className="contact-message">
              <h3>{message.firstName} {message.lastName}</h3>
              <p>Email: {message.email}</p>
              <p>Phone: {message.phone}</p>
              <p>Category: {message.category}</p>
              <p>Comments: {message.comments}</p>
              <button onClick={() => handleDelete(message.id)} className="delete-btn">
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No messages to display.</p>
      )}
    </div>
  );
};

export default Messages;
