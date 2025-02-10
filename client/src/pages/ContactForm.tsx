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

    // Enforce comments character limit
    if (formData.comments.length > 1000) {
      alert("Comments cannot exceed 1000 characters.");
      return;
    }

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    <form onSubmit={handleSubmit}>
      <select name="category" value={formData.category} onChange={handleChange} required>
        <option value="Service Request">Service Request</option>
        <option value="Interest in a Car">Interest in a Car</option>
        <option value="Appraisal">Appraisal</option>
        <option value="General Inquiry">General Inquiry</option>
      </select>
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
      <textarea name="comments" value={formData.comments} onChange={handleChange} placeholder="Comments (Max 1000 characters)" maxLength={1000} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Contact;
