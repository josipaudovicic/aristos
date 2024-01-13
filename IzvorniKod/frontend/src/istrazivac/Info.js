import React from 'react';
import { useNavigate } from 'react-router-dom';

function InfoStranica() {
  const navigate = useNavigate();

  const redirectToPage = async (path) => {
      try {
      let response;
      if (path === "/explorer/action/info/tasks") {
        response = await fetch(`/explorer/action/info/tasks`);
      } else {
        response = await fetch(`/explorer/action/info/requests`);
      }

      const data = await response.json();
      navigate(`/${path}`, {state: {users: data}});

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

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={() => redirectToPage('/explorer/action/info/tasks')} style={regularButtonStyle}>Popis zadataka</button>
      <button onClick={() => redirectToPage('/explorer/action/info/requests')} style={regularButtonStyle}>Zahtjev za tragačima</button>
    </div>
  );
}

export default InfoStranica;