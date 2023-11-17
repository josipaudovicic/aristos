import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Navigate } from 'react-router-dom';

const Korisnik = () => {
  console.log("Renderamo korisnika");
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state.user);
  const users = location.state.users;
  const [user, setUser] = useState(location.state.user);

  const renderData = async () => {
      try {
        const response = await fetch(`/admin/users/${id}`);
        const data = await response.json();
        console.log(data);
        console.log(location.state.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
  };

  useEffect(() => {
    renderData();
  }, []);


  const handleEdit = async () => {
    try {
      const response = await fetch(`admin/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user), 
      });
      navigate(`/user/${user.username}`, { state: {user: user }});
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

  return (
    <div>
      <h2>Korisnik: {user.username}</h2>
      <p>Ime: {user.name}</p>
      <p>Prezime: {user.surname}</p>
      <p>Fotografija: <img src={user.file} alt="User" /></p>
      <p>Email: {user.email}</p>
      <p>Lozinka: {user.password}</p>
      <p>Uloga: {user.role}</p>

      <div>
        <button onClick={handleEdit}>Promjeni podatke</button>
        <button onClick={handleDelete}>Izbriši korisnika</button>
      </div>
    </div>
  );
};

export default Korisnik;
