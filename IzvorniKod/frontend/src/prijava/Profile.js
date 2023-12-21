import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch('/profile', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  const labelStyle = {
    display: 'block',
    marginBottom: '4px',
    fontWeight: 'bold',
  };

  const spanStyle = {
    marginLeft: '8px',
  };

  const buttonStyle = {
    marginTop: '12px',
    padding: '8px 16px',
    fontSize: '16px',
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
        <h2>Moj Profil</h2>
      </div>
      <div>
        <label style={labelStyle}>Korisničko ime: </label>
        <span style={spanStyle}>{userData.username}</span>
      </div>
      <div>
        <label style={labelStyle}>Ime: </label>
        <span style={spanStyle}>{userData.name}</span>
      </div>
      <div>
        <label style={labelStyle}>Prezime: </label>
        <span style={spanStyle}>{userData.surname}</span>
      </div>
      <div>
        <label style={labelStyle}>Email: </label>
        <span style={spanStyle}>{userData.email}</span>
      </div>
      <div>
        <label style={labelStyle}>Lozinka: </label>
        <span style={spanStyle}>{userData.password}</span>
      </div>
      <div>
        <label style={labelStyle}>Uloga: </label>
        <span style={spanStyle}>{userData.status}</span>
      </div>
      <div>
        <label style={labelStyle}>Fotografija: </label>
        <span style={spanStyle}>{userData.photo}</span>
      </div>
      <div style={centerStyle}>
        <Link to="/edit-profile">
          <button style={buttonStyle}>Uredi podatke</button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
