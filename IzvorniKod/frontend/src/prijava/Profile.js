import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState({});
  const location = useLocation();
  const username = location.state.username;

  useEffect(() => {
    fetch('/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        username: username,
      },
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

  const img = {
    width: '300px',
    height: '200px',
  }

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
        <span style={spanStyle}>{userData.role}</span>
      </div>
      <div>
        <label style={labelStyle}>Fotografija: </label>
        <span style={spanStyle}>{<img src={userData.file} style={img}></img>}</span>
      </div>
      <div style={centerStyle}>
        <Link to="/edit-profile"> {/*!!!!!! ne koristi Link nego navigate i prosljeduj mi username*/}
          <button style={buttonStyle}>Uredi podatke</button> 
        </Link>
      </div>
    </div>
  );
}

export default Profile;
