import React, { useEffect, useState } from "react";
// For use with the Employee page. This views the submitted information. Currently not hooked.

interface ContactMessage {
    id: number;
    firstName: string;
    lastName: string;
    category: string;
    email: string;
    phone: string;
    comments: string;
  }
  
  const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
  
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contact");
        const data: ContactMessage[] = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
    const deleteMessage = async (id: number) => {
      try {
        const response = await fetch(`http://localhost:5000/api/contact/${id}`, { method: "DELETE" });
        if (response.ok) {
          setMessages(messages.filter((message) => message.id !== id));
        }
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    };
  
    useEffect(() => {
      fetchMessages();
    }, []);
  

  return (
    <div>
      <h1>Contact Requests</h1>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        messages.map((msg) => (
          <div key={msg.id}>
            <h2>{msg.firstName} {msg.lastName}</h2>
            <p><strong>Category:</strong> {msg.category}</p>
            <p><strong>Email:</strong> {msg.email}</p>
            <p><strong>Phone:</strong> {msg.phone}</p>
            <p><strong>Comments:</strong> {msg.comments}</p>
            <button onClick={() => deleteMessage(msg.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
