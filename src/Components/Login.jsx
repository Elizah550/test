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
const apiEndpoint = 'https://1nubdjeme9.execute-api.ap-south-1.amazonaws.com/Stage_IKANlogin';
const proxyEndpoint = 'https://cors-anywhere.herokuapp.com/';

export default function SignInPage() {
  const [Fullname, setUsername] = useState('');
  const [Phone, setPassword] = useState('');
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
    return isValid;
  };

  const handleSubmit = async (event) => {
    console.log(event);
    event.preventDefault();
    if (handleValidation()) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Fullname, Phone }),
      };

      //9133599721
      fetch(proxyEndpoint + apiEndpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('Data retrieved successfully:', data);
          var user = [];
          user = data;
          console.log(data.length);
          if (user.length !== 0 ) {
            window.location.href = '/search';
          } else {
            setError('Invalid username or password');
          }
        })
        .catch((error) => {
          console.error('An error occurred while retrieving data from the API:', error);
          setError('An error occurred while retrieving data from the API');
        });      
    }
  };

  return (
    <div className="text-center m-5-auto">
      <h2>Sign in to us</h2>
      {error && <p>{error}</p>}
      <form action="/home">
        <p>
          <label>Username or email address</label>
          <br />
          <input
            type="text"
            name="username"
            required
            value={Fullname}
            onChange={(event) => setUsername(event.target.value)}
          />
        </p>
        <p>
          <label>Password</label>
          <Link to="/forget-password">
            <label className="right-label">Forgot password?</label>
          </Link>
          <br />
          <input
            type="password"
            name="password"
            required
            value={Phone}
            onChange={(event) => setPassword(event.target.value)}
          />
        </p>
        <p>
          <button id="sub_btn" type="submit" onClick={handleSubmit}>
            Login
          </button>
        </p>
      </form>
      <footer>
        <p>
          First time? <Link to="/register">Create an account</Link>.
        </p>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}
