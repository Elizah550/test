import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-south-1',
  accessKeyId: 'AKIAYKE3OIZN2ANWUYVT',
  secretAccessKey: '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',
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = 'Ikansignup';
const apiEndpoint = 'https://b2akv07sji.execute-api.ap-south-1.amazonaws.com/Ikan_Signup';
const proxyEndpoint = 'https://cors-anywhere.herokuapp.com/';

export default function SignupPage() {
  const [Fullname, setFullname] = useState('');
  const [Phone, setPhone] = useState('');
  const [Email, setEmail] = useState('');
  const [Age, setAge] = useState('');
  const [error, setError] = useState(null);

  const handleValidation = () => {
    let isValid = true;
    // Fullname validation - must contain only alphabets and spaces
    if (!/^[a-zA-Z\s]+$/.test(Fullname)) {
      setError('Please enter a valid name (alphabets and spaces only)');
      isValid = false;
    }
    // Phone validation - must contain 10 digits only
    if (!/^\d{10}$/.test(Phone)) {
      setError('Please enter a valid phone number (10 digits only)');
      isValid = false;
    }
    // Email validation - must contain @ and .
    if (!/^\S+@\S+\.\S+$/.test(Email)) {
      setError('Please enter a valid email address');
      isValid = false;
    }
    // Age validation - must be a number between 18 and 120
    if (isNaN(Age) || Age < 18 || Age > 120) {
      setError('Please enter a valid age (between 18 and 120)');
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const params = {
        TableName: tableName,
        Item: {
          Ikansignup: Phone,
          Fullname,
          Phone,
          Email,
          Age: Number(Age),
        },
      };
      dynamodb.put(params, (error, data) => {
        if (error) {
          console.error('An error occurred while saving data to DynamoDB:', error);
          setError('An error occurred while saving data to DynamoDB');
        } else {
          console.log('Data saved successfully:', data);
          window.location.href = '/login';
        }
      });
    }
  };

  return (
    <div className="text-center m-5-auto">
      <h2>Create an account</h2>
      {error && <p>{error}</p>}
      <form>
        <p>
          <label>Full name</label>
          <br />
          <input
            type="text"
            name="Fullname"
            required
            value={Fullname}
            onChange={(event) => setFullname(event.target.value)}
          />
        </p>
        <p>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="Email"
            required
            value={Email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </p>
        <p>
        <label>Age</label>
        <br />
        <input
            type="number"
            name="Age"
            required
            min="18"
            value={Age}
            onChange={(event) => setAge(event.target.value)}
        />
        </p>
        <p>
        <label>Phone Number</label>
        <br />
        <input
            type="tel"
            name="PhoneNumber"
            required
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            value={Phone}
            onChange={(event) => setPhone(event.target.value)}
        />
        </p>
        <button type="submit" onClick={handleSubmit}>
          Sign up
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}