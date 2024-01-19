import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function StationManager() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state.username;
  const [station, setStation] = useState('');
  console.log(username);

  useEffect(() => {
    fetch(`/manager/station`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'username': username
      },
    }).then((response) => response.json())
      .then((data) => {
        setStation(data.station);
      }).catch((error) => { console.error('Error:', error); });
  });

  const redirectToPage = async (path) => {
    try {
      let response;
      if (path === 'manager/trackers') {
        console.log("Hello World");
        response = await fetch(`/manager/trackers`,{
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json', 
            'username': username
          },
        });
      } else if (path === 'manager/mytrackers') {
        response = await fetch(`/manager/mytrackers`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json', 
            'username': username
          },
        });
      } else if (path === 'manager/actions') {
        navigate('/manager/actions', {state : {username: username}});
      } else if (path === 'manager/requests') {
        console.log("Username that wants to know requests for actions", username);
        response = await fetch(`/manager/requests`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json', 
            'username': username
          },
        });
      } else if (path === 'profile') {
        navigate(`/profile`, { state: { username: username } });
      }
      
      if (path !== 'manager/actions' && path !== 'profile') {
        const data = await response.json();
        console.log("data ", data);
        console.log("path ", path);
        navigate(`/${path}`, { state: { data: data, username: username } });
      }
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
      <h1 style={{ marginTop: '100px' }}>Voditelj stanice {station}</h1>
      <button onClick={() => redirectToPage('profile')} style={profileButtonStyle}>Moj profil</button>
      <button onClick={() => redirectToPage('manager/trackers')} style={regularButtonStyle}>Pregled svih tragača</button>
      <button onClick={() => redirectToPage('manager/mytrackers')} style={regularButtonStyle}>Pregled svojih tragača</button>
      <button onClick={() => redirectToPage('manager/actions')} style={regularButtonStyle}>Pregled akcija</button>
      <button onClick={() => redirectToPage('manager/requests')} style={regularButtonStyle}>Pregled zahtjeva</button>
    </div>
  );
}

export default StationManager;
