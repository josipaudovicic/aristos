import React from 'react';
import { useNavigate } from 'react-router-dom';

function StationManager() {
  const navigate = useNavigate();

  const redirectToPage = async (path) => {
    try {
      let response;
      if (path === 'manager/trackers') {
        response = await fetch(`/manager/trackers`);
      } else if (path === 'manager/mytrackers') {
        response = await fetch(`/manager/mytrackers`);
      } else if (path === 'manager/actions') {
        response = await fetch(`/manager/actions`);
      } else if (path === 'manager/requests') {
        response = await fetch(`/manager/requests`);
      } else if (path === 'profile') {
        response = await fetch(`/profile`);
      }

      const data = await response.json();
      navigate(`/${path}`, { state: { users: data } });
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
      <button onClick={() => redirectToPage('manager/trackers')} style={regularButtonStyle}>Pregled svih tragača</button>
      <button onClick={() => redirectToPage('manager/mytrackers')} style={regularButtonStyle}>Pregled svojih tragača</button>
      <button onClick={() => redirectToPage('manager/actions')} style={regularButtonStyle}>Pregled akcija</button>
      <button onClick={() => redirectToPage('manager/requests')} style={regularButtonStyle}>Pregled zahtjeva</button>
    </div>
  );
}

export default StationManager;
