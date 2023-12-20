import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var validate = validateForm();
  
    if (!validate) {
      alert("Nisu popunjena sva polja!\n   Molimo sve ispunite!");
    } else {
      try {
        const formDataToSend = new FormData();
  
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }
  
        const response = await fetch('/login', {
          method: 'POST',
          body: formDataToSend,
        });
        
        if (response.ok) {
          const result = await response.text(); // Assuming the backend returns a simple string response
          console.log(result);
          if (result == "true") {navigate('/welcome', { state: { username: formData.username } });}
          else {alert("Wrong password!")}
        } else {
          const errorMessage = await response.json();
          console.error('Login failed:', errorMessage);
          alert(errorMessage.message);
        }
      } catch (error) {
        console.error('Error during login:', error.message);
      }
    }
    console.log('Podaci za prijavu:', formData);
  };

  function validateForm(){
    if (formData.password === '' || formData.username === ''){
      return false;
    } return true;
  }

  return (
    <div className='container'>
      <h2>Prijavi se:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Korisničko ime: <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required/></label>
        <label htmlFor="password">Lozinka: <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange}/></label>
        <button type="submit" id="submitBtn">Prijava</button><br />
        <p>Niste se registrirali? <Link to="/registration">Registrirajte se</Link></p>
      </form>
    </div>
  );
}

export default Login;

