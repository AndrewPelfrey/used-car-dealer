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

  const [errors, setErrors] = useState({
    phone: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Allow only digits and enforce max 10 characters
      const numericValue = value.replace(/\D/g, "");

      setFormData({ ...formData, phone: numericValue });

      // Validate phone (must be exactly 10 digits)
      if (numericValue.length !== 10) {
        setErrors({ ...errors, phone: "Phone number must be exactly 10 digits." });
      } else {
        setErrors({ ...errors, phone: "" });
      }
    } else if (name === "email") {
      setFormData({ ...formData, email: value });

      // Validate email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setErrors({ ...errors, email: "Invalid email format." });
      } else {
        setErrors({ ...errors, email: "" });
      }
    } else if (name === "comments") {
      if (value.length <= 1000) {
        setFormData({ ...formData, comments: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (errors.phone || errors.email) {
      alert("Please correct the errors before submitting.");
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
        setErrors({ phone: "", email: "" });
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
          {errors.email && <p className="error">{errors.email}</p>}
        </label>

        <label className="block">
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </label>

        <label className="block">
          Comments (1000 characters max):
          <textarea name="comments" value={formData.comments} onChange={handleChange} required />
          <p className="char-count">{formData.comments.length} / 1000</p>
        </label>

        <button type="submit" disabled={!!errors.phone || !!errors.email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;