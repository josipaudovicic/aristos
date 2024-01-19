import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Registration() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const [formData, setFormData] = useState({
    status: '',
    username: '',
    file: null,
    password: '',
    name: '',
    surname: '',
    email: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    var validate = validateForm();
  
    if (!validate) {
      
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
  
        navigate('/poruka', {state: {username: formData.username, role: formData.status}});
        
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
    const { email, name, surname, password, username, status, file } = formData;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email)) {
        alert('Unesite ispravan email format!');
        return false;
      }

      if (password.length < 8) {
        alert('Lozinka mora imati najmanje 8 znakova!');
        return false;
      }

      const allowedPictureExtensions = ['.png', '.jpg', '.jpeg'];
      const fileName = file?.name || '';
      const maximumImageSize = 10240 * 1024;
      const fileExtension = fileName.split('.').pop().toLowerCase();
      console.log('File Extension:', fileExtension);

      if (!allowedPictureExtensions.includes('.' + fileExtension)) {
        alert('Format slike nije podržan! Molimo odaberite sliku u formatu .png, .jpg, ili .jpeg.');
        return false;
      }

      if (file.size > maximumImageSize) {
        alert('Slika je prevelika. Ne smije zauzimati više od 10MB.');
      return false;
      }

      if (
        email === '' ||
        name === '' ||
        surname === '' ||
        password === '' ||
        username === '' ||
        status === '' ||
        file === null
      ) {
        alert("Nisu popunjena sva polja!\n   Molimo sve ispunite!");
        return false;
      }

    return true;
  };

  const button = {
    backgroundColor: isHovered ? '#012B27' : '#024D44', 
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '5px',
    fontFamily: 'Arial',
    fontSize: '16px',
    width: '100px',
  };

  return (
    <div className='container'>
      <h2>Registriraj se:</h2>
      <form onSubmit={handleSubmit}>
        <fieldset> 
          <legend>Odaberite ulogu:</legend>
          <label className='roles1'><input type="radio" name="status" value="Istraživač" checked={formData.status === 'Istraživač'} onChange={handleInputChange}/>istraživač</label><br/>
          <label className='roles2'><input type="radio" name="status" value="Voditelj postaje" checked={formData.status === 'Voditelj postaje'} onChange={handleInputChange} />voditelj postaje</label><br/>
          <label className='roles3'><input type="radio" name="status" value="Tragač" checked={formData.status === 'Tragač'} onChange={handleInputChange}/>tragač na terenu</label><br/>
        </fieldset>
        <label htmlFor="username">Korisničko ime: <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required/></label>
        <label htmlFor="file">Postavite svoju fotografiju: <input type="file" name="file" id="file" onChange={handleInputChange} required/></label>
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
        <label htmlFor="name">Ime: <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required/></label>
        <label htmlFor="surname">Prezime: <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleInputChange} required/></label>
        <label htmlFor="email">E-mail: <input type="email" id='email' name='email' value={formData.email} onChange={handleInputChange} required/></label>
        <label> 
          <input type="submit" style={button} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} value={"Potvrdi"} onClick={handleSubmit} />
        </label>
        <p>Već ste se registrirali? <Link to="/">Prijava</Link></p>
      </form>
    </div>
  );
  }

export default Registration;
