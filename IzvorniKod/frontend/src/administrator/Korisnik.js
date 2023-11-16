import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Navigate } from 'react-router-dom';

const Korisnik = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(location.state.user);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://api.example.com/users/${id}`);
        const data = await response.json();
        setUser(data); 
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleEdit = async () => {
    try {
      const response = await fetch(`https://api.example.com/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user), 
      });
  
      navigate(`/user/${id}`);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };
  
  

  const handleDelete = async () => {
    try {
      await fetch(`https://api.example.com/users/${id}`, {
        method: 'DELETE',
      });
  
      navigate('/users');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Korisnik: {user.username}</h2>
      <p>Ime: {user.name}</p>
      <p>Prezime: {user.surname}</p>
      <p>Fotografija: <img src={user.file} alt="User" /></p>
      <p>Email: {user.email}</p>
      <p>Lozinka: {user.password}</p>
      <p>Uloga: {user.status}</p>

      <div>
        <button onClick={handleEdit}>Promjeni podatke</button>
        <button onClick={handleDelete}>Izbriši korisnika</button>
      </div>
    </div>
  );
};

export default Korisnik;
