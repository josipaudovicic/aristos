import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Explorer() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state.username;

  const redirectToPage = async (path) => {
    try {
      let response;
      if (path === 'explorer/actions') {
        response = await fetch(`/explorer/actions` , {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            username: username,
          },  });
      } else if (path === 'explorer/map') {
        response = await fetch(`/explorer/map`);
      } else if (path === 'explorer/animals') {
        response = await fetch(`/explorer/animals`);
      } else if (path === 'profile') {
        navigate(`/profile`, { state: { username: username } });
      }

      const data = await response.json();
      console.log(username);
      navigate(`/${path}`, { state: { users: data, username: username } });
    } catch (error) {
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
      <button onClick={() => redirectToPage('explorer/actions')} style={regularButtonStyle}>Popis akcija</button>
      <button onClick={() => redirectToPage('explorer/map')} style={regularButtonStyle}>Karta - životinje</button>
      <button onClick={() => redirectToPage('explorer/animals')} style={regularButtonStyle}>O životinjama</button>
    </div>
  );
}

export default Explorer;
