import React from 'react';
import { useNavigate } from 'react-router-dom';

function Animals() {
  const navigate = useNavigate();

  const redirectToPage = async (path) => {
      try {
      let response;
      if (path === "species") {
        response = await fetch(`/explorer/map/species`);
      } else {
        response = await fetch(`/explorer/map/individual`);
      }

      const data = await response.json();
      navigate(`/${path}`, {state: {data: data}});

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
      <button onClick={() => redirectToPage('species')} style={regularButtonStyle}>Karta po vrsti</button>
      <button onClick={() => redirectToPage('individual')} style={regularButtonStyle}>Karta po jedinci</button>
    </div>
  );
}

export default Animals;