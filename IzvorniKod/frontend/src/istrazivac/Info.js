import React from 'react';
import { useNavigate } from 'react-router-dom';

function infoStranica() {
  const navigate = useNavigate();

  const redirectToPage = async (path) => {
      try {
      let response;
      if (path === "popisZadataka") {
        response = await fetch(`/explorer/allTasks`);
      } else {
        response = await fetch(`/explorer/requestForTrackers`);
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
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={() => redirectToPage('popisZadataka')} style={regularButtonStyle}>Popis zadataka</button>
      <button onClick={() => redirectToPage('zahtjevZaTragacima')} style={regularButtonStyle}>Zahtjev za tragačima</button>
    </div>
  );
}

export default infoStranica;