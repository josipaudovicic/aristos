import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css';
import { BASE_URL } from '../config';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
  
        const response = await fetch(`${BASE_URL}/login`, {
          method: 'POST',
          body: formDataToSend,
        });
        
        if (response.ok) {
          const result = await response.text(); // Assuming the backend returns a simple string response
          console.log(result);
          if (result === "true") {
            const response = await fetch(`${BASE_URL}/role`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'username': formData.username
              },
            });
            const data = await response.json();
            if (data.role === "admin") navigate('/admin', { state: { username: formData.username } });
            else if (data.role === "explorer") navigate('/explorer', { state: { username: formData.username } });
            else if (data.role === "tracker") navigate('/tracker', { state: { username: formData.username } });
            else if (data.role === "manager") navigate('/manager', { state: { username: formData.username } });
          }
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
        <label htmlFor="password">Lozinka:
          <div style={{ position: 'relative' }}><input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleInputChange}/>
            <span
              style={{
                position: 'absolute',
                top: '35%',
                right: '10px',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
              onClick={togglePasswordVisibility}>{showPassword ? '🔓' : '🔒'}
            </span>
          </div>
        </label>
        <button type="submit" id="submitBtn">Prijava</button><br />
        <p>Niste se registrirali? <Link to="/registration">Registrirajte se</Link></p>
      </form>
    </div>
  );
}

export default Login;

