import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../config';

const Korisnik = () => {
  console.log("Renderamo korisnika");
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useState(location.state.user);


  const handleEdit = async () => {
    try {
      navigate(`/user/${user.username}/edit`, { state: {user: user }});
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };
  
  

  const handleDelete = async () => {
    try {
      await fetch(`${BASE_URL}/admin/users/${user.username}`, {
        method: 'DELETE',
      });
      navigate('/admin');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  

  if (!user) {
    return <p>Loading...</p>;
  }

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


  return (
    <div className='container'>
      <h2>Korisnik: {user.username}</h2>
      <p>Ime: {user.name}</p>
      <p>Prezime: {user.surname}</p>
      <p>Fotografija: <img src={BASE_URL + '' + user.file} alt="User" style={{ width: '400px', height: '300px' }} /></p>
      <p>Email: {user.email}</p>
      <p>Lozinka: {user.password}</p>
      <p>Uloga: {user.role}</p>

      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={handleEdit}>Promjeni podatke</button>
        <button style={buttonStyle} onClick={handleDelete}>Izbriši korisnika</button>
      </div>
    </div>
  );
};

export default Korisnik;
