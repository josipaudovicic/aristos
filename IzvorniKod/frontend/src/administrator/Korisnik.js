import React, { useState } from 'react';
import { useParams, useNavigate, useLocation, Navigate } from 'react-router-dom';

const Korisnik = () => {
  console.log("Renderamo korisnika");
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useState(location.state.user);
  const username = location.state?.username;


  const handleEdit = async () => {
    try {
      console.log("Saljemo zahtjev");
      const updatedUser = {
        ...user,
        additionalData: '',
      };
      const response = await fetch(`/admin/changeUserData/${user.username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          username: username, 
        },
        body: JSON.stringify(updatedUser), 
      });
      navigate(`/user/${user.username}`, { state: {user: updatedUser }});
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };
  
  

  const handleDelete = async () => {
    try {
      await fetch(`/admin/users/${user.username}`, {
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
    <div>
      <h2>Korisnik: {user.username}</h2>
      <p>Ime: {user.name}</p>
      <p>Prezime: {user.surname}</p>
      <p>Fotografija: <img src={user.file} alt="User" style={{ width: '400px', height: '300px' }} /></p>
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
