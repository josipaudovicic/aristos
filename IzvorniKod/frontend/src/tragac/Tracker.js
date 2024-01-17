import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Tracker() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state.username;

  const redirectToPage = async (path) => {
    try {
      let response;
      if (path === 'tracker/action') {
        response = await fetch(`/tracker/action` , {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            username: username,
          },  });
      } else if (path === 'tracker/animals') {
        response = await fetch(`/tracker/animals`);
      } else if (path === 'profile') {
        navigate(`/profile`, { state: { username: username } });
      }

      const data = await response.json();
      console.log(username);
      console.log(data);
      navigate(`/${path}`, { state: { action: data, username: username } });
    } catch (error) {
      alert('Čekaj da te voditelj pridodjeli akciji!');
      console.error(`Error fetching data:`, error.message);
    }
  };

  const profileButtonStyle = {
    position: 'fixed',
    top: '10px',
    right: '10px',
    padding: '8px 16px',
    backgroundColor: '#5C5C5C',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    marginTop: '-200px', 
  };

  const regularButtonStyle = {
    padding: '18px 18px',
    fontSize: 20,
    cursor: 'pointer',
  };

  return (
    <div style={buttonContainerStyle}>
      <button onClick={() => redirectToPage('profile')} style={profileButtonStyle}>Moj profil</button>
      <button onClick={() => redirectToPage('tracker/action')} style={regularButtonStyle}>Moja akcija</button>
      <button onClick={() => redirectToPage('tracker/animals')} style={regularButtonStyle}>O životinjama</button>
    </div>
  );
}

export default Tracker;
