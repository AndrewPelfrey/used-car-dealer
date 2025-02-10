import React, { useState } from "react";
import "../styles/contact.css";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    category: "General Inquiry",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    comments: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.comments.length > 1000) {
        alert("Comments Cannot exceed 100 characters.");
        return;
    };

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Your message has been sent!");
        setFormData({
          category: "General Inquiry",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          comments: "",
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting the form.");
    }
  };

  return (
    <div className="contact-form-container">
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label className="block">
          Category:
          <select name="category" value={formData.category} onChange={handleChange}>
            <option>Service Request</option>
            <option>Interest in a Car</option>
            <option>Appraisal</option>
            <option>General Inquiry</option>
          </select>
        </label>

        <label className="block">
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>

        <label className="block">
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </label>

        <label className="block">
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label className="block">
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>

        <label className="block">
          Comments (1000 characters max):
          <textarea name="comments" value={formData.comments} onChange={handleChange} required />
        </label>

        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
