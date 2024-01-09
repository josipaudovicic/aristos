import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formerUsername = location.state?.username;
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    status: '',
    photo: '',
  });

  useEffect(() => {
    fetch('/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        username: formerUsername, 
      },
    })
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching user data for editing:', error));
  }, [formerUsername]);
  console.log(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancelClick = () => {
    console.log(formerUsername);
    navigate('/profile', { state: {username: formerUsername }});
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('/save-profile-changes', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          username: formerUsername,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('Profile changes saved successfully');
        navigate('/profile', { state: {username: formerUsername }});
      } else {
        console.error('Failed to save profile changes');
      }
    } catch (error) {
      console.error('Error saving profile changes:', error);
    }
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '4px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    marginBottom: '8px',
    padding: '8px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between', 
    marginTop: '12px',
  };

  const buttonStyle = {
    flex: '1', 
    marginLeft: '8px',
    padding: '8px 16px',
    fontSize: '16px',
    marginTop: '12px',
  };

  const containerStyle = {
    textAlign: 'left',
  };

  const centerStyle = {
    textAlign: 'center', 
  };

  return (
    <div className="container" style={containerStyle}>
      <div style={centerStyle}>
        <h2>Uredi podatke - korisnik {userData.username}</h2>
      </div>
      <div>
        <label style={labelStyle}>Ime: </label>
        <input type="text" name="name" value={userData.name} onChange={handleChange} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Prezime: </label>
        <input type="text" name="surname" value={userData.surname} onChange={handleChange} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Email: </label>
        <input type="text" name="email" value={userData.email} onChange={handleChange} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Lozinka: </label>
        <input type="password" name="password" value={userData.password} onChange={handleChange} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Fotografija: </label>
        <input type="file" name="photo" value={userData.photo} onChange={handleChange} style={inputStyle} />
      </div>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={handleSaveChanges}>
          Spremi promjene
        </button>
        <button style={buttonStyle} onClick={handleCancelClick}>
          Odustani
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
