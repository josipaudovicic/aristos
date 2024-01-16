import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function InfoStranica() {
  const navigate = useNavigate();
  const location = useLocation();
  const actionName = location.state?.actionName;
  const username = location.state?.username;

  const redirectToPage = async (path) => {
      try {
      let response;
      if (path === "/explorer/action/info/tasks") {
        response = await fetch(`/explorer/action/info/tasks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            actionName: actionName,
          }, 
        });
      } else {
        response = await fetch(`/explorer/action/info/requests`);
      }

      const data = await response.json();
      console.log(data);
      navigate(`/${path}`, {state: {data: data, actionName: actionName, username: username}});

    } catch (error) {
      console.error(`Error fetching`, error.message);
    }
  };

  const regularButtonStyle = {
    padding: '18px 18px',
    fontSize: 20,
    cursor: 'pointer',
    margin: '10px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    marginTop: '-200px', 
  };

  return (
    <div style={buttonContainerStyle}>
      <button onClick={() => redirectToPage('explorer/action/info/tasks')} style={regularButtonStyle}>Popis zadataka</button>
      <button onClick={() => redirectToPage('explorer/action/info/requests')} style={regularButtonStyle}>Zahtjev za tragačima</button>
    </div>
  );
}

export default InfoStranica;