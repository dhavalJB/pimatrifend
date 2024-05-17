import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './css/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    text: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = 'service_g1r6bb8';
    const templateID = 'template_h0a6kfo';
    const userID = 'Kgkp5m0HNC9pz-_V-';

    const templateParams = {
      to_name: 'Recipient Name', // Replace with the recipient's name
      from_name: formData.name,
      message: formData.text,
      reply_to: formData.email,
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
        alert('Email sent successfully!');
      }, (error) => {
        console.error('Failed to send email:', error);
        alert('Failed to send email. Please try again later.');
      });

    setFormData({
      name: '',
      username: '',
      email: '',
      text: ''
    });
  };

  return (
    <div>
      <br />
      <h2>Contact Form</h2>  
      <form className='contactForma' onSubmit={handleSubmit}>    
        <input
          name="name"
          type="text"
          className="feedback-input"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />   
        <input
          name="username"
          type="text"
          className="feedback-input"
          placeholder="PI Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          className="feedback-input"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="text"
          className="feedback-input"
          placeholder="Comment"
          value={formData.text}
          onChange={handleChange}
          required
        />
        <input type="submit" value="SUBMIT"/>
      </form>
    </div>
  );
}

export default Contact;
