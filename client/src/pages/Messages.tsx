import React, { useEffect, useState } from "react";
import "../styles/messages.css";

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<number | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token"); // Retrieve JWT token from storage

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

    const token = localStorage.getItem("token");

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

  const formatPhoneNumber = (phone: string) => {
    if (phone.length === 10) {
      return `(${phone.slice(0, 3)}) - ${phone.slice(3, 6)} - ${phone.slice(6)}`;
    }
    return phone; // Fallback if phone number is not exactly 10 digits
  };

  const copyToClipboard = (email: string, id: number) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopiedEmail(id); // Set the copied message ID
      setTimeout(() => setCopiedEmail(null), 2000); // Hide after 2 seconds
    }).catch(err => console.error("Failed to copy:", err));
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
              <p><strong>Category:</strong> {message.category}</p>
              <p>
                <strong>Email:</strong>{" "}
                <span 
                  className="copy-email"
                  onClick={() => copyToClipboard(message.email, message.id)}
                  title="Click to copy"
                >
                  {message.email}
                </span>
              </p>
              <p><strong>Phone:</strong> {formatPhoneNumber(message.phone)}</p>
              <p><strong>Comments:</strong> {message.comments}</p>
              <button onClick={() => handleDelete(message.id)} className="delete-btn">
                Delete
              </button>
              {copiedEmail === message.id && <span className="copied-confirm">✔ Copied!</span>}
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