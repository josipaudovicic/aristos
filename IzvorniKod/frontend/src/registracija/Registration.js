import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Registration() {
  const navigate = useNavigate();

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
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
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
  
        const response = await fetch('/register', {
          method: 'POST',
          body: formDataToSend,
        });
  
        navigate('/poruka', {state: {username: formData.username}});
        
        if (response.ok) {
          console.log('Registration successful');
        } else {
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error.message);
      }
    }
  };
  

  function validateForm(){
    if (formData.email === '' || formData.name === '' || formData.surname === '' || formData.password === '' || formData.username === '' || formData.status === '' || formData.file === null){
      return false;
    } return true;
  }

  return (
    <div>
      <h2>Registriraj se:</h2>
      <form onSubmit={handleSubmit}>
        <fieldset> 
          <legend>Odaberite ulogu:</legend>
          <label><input type="radio" name="status" value="Istraživač" checked={formData.status === 'Istraživač'} onChange={handleInputChange}/>istraživač</label><br/>
          <label><input type="radio" name="status" value="Voditelj postaje" checked={formData.status === 'Voditelj postaje'} onChange={handleInputChange} />voditelj postaje</label><br/>
          <label><input type="radio" name="status" value="Tragač" checked={formData.status === 'Tragač'} onChange={handleInputChange}/>tragač na terenu</label><br/><br/>
        </fieldset>
        <label htmlFor="username">Korisničko ime: <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required/></label><br /><br/>
        <label htmlFor="file">Postavite svoju fotografiju: <input type="file" name="file" id="file" onChange={handleInputChange} required/></label><br /><br/>
        <label htmlFor="password">Lozinka: <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required/></label><br /><br/>
        <label htmlFor="name">Ime: <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required/></label><br /><br/>
        <label htmlFor="surname">Prezime: <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleInputChange} required/></label><br /><br/>
        <label htmlFor="email">E-mail: <input type="email" id='email' name='email' value={formData.email} onChange={handleInputChange} required/></label><br /><br/><br/>
        <label> 
          <input type="submit" id="submitBtn" value={"Potvrdi"} onClick={handleSubmit} />
        </label>
      </form>
    </div>
  );
  }

export default Registration;
