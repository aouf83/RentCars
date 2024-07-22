import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [logo, setLogo] = useState('');
  const [transmission, setTransmission] = useState('');
  const [fuel, setFuel] = useState('');
  const [seats, setSeats] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('image', image);
      formData.append('logo', logo);
      formData.append('transmission', transmission);
      formData.append('fuel', fuel);
      formData.append('seats', seats);

      await axios.post('http://localhost:5050/admincart', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Item added to admin cart successfully');
      setErrorMessage('');
      // Clear form fields after successful submission
      setName('');
      setPrice('');
      setImage(null);
      setLogo('');
      setTransmission('');
      setFuel('');
      setSeats('');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to add item to admin cart');
      setSuccessMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Hourly Rate (₹):</label>
        <input
          type="text"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          onChange={(event) => setImage(event.target.files[0])}
          accept="image/*"
          required
        />
      </div>
      <div>
        <label htmlFor="logo">Logo:</label>
        <input
          type="text"
          value={logo}
          onChange={(event) => setLogo(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="transmission">Transmission:</label>
        <input
          type="text"
          value={transmission}
          onChange={(event) => setTransmission(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="fuel">Fuel:</label>
        <input
          type="text"
          value={fuel}
          onChange={(event) => setFuel(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="seats">Seats:</label>
        <input
          type="text"
          value={seats}
          onChange={(event) => setSeats(event.target.value)}
          required
        />
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Admin;
