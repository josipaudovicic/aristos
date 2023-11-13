import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Registration() {
  const history = useHistory();

  const [formData, setFormData] = useState({
    status: '',
    username: '',
    file: null,
    password: '',
    name: '',
    surname: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
    try {
      const response = await fetch('your_server_endpoint_here', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Registration successful');
        history.push('/poruka');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <div>
      <h4>Registriraj se:</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <select id="status" name="status" value={formData.status} onChange={handleInputChange} required>
            <option value="istraživač">istraživač</option>
            <option value="voditelj postaje">voditelj postaje</option>
            <option value="tragač na terenu">tragač na terenu</option>
          </select>
        </div>
        <label htmlFor="username">Korisničko ime: <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required/></label><br />
        <label htmlFor="file">Postavite svoju fotografiju: <input type="file" name="file" id="file" onChange={handleInputChange} required/></label><br />
        <label htmlFor="password">Lozinka: <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required/></label><br />
        <label htmlFor="name">Ime: <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required/></label><br />
        <label htmlFor="surname">Prezime: <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleInputChange} required/></label><br />
        <label htmlFor="email">E-mail: <input type="email" id='email' name='email' value={formData.email} onChange={handleInputChange} required/></label><br />
        <label><input type='submit' id='submit' name='submit' value={"Potvrdi"} onClick={handleSubmit}/></label>
      </form>
    </div>
  );
  }

export default Registration;
