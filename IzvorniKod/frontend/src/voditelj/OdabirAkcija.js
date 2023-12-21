import React from 'react';
import { useNavigate } from 'react-router-dom';

function OdabirAkcija() {
  const navigate = useNavigate();

  const redirectToPage = async (path) => {
      try {
      let response;
      if (path === "neaktivne") {
        response = await fetch(`/manager/inactiveActions`);
      } else {
        response = await fetch(`/manager/activeActions`);
      }
      const data = await response.json();
      navigate(`/${path}`, {state: {users: data}});

    } catch (error) {
      console.error(`Error fetching actions:`, error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Choose an Option:</h2>
      <button
        style={{
          fontSize: '1.5em',
          padding: '10px 20px',
          margin: '10px',
        }}
        onClick={() => redirectToPage('aktivne')}
      >
        aktivne akcije
      </button>
      <button
        style={{
          fontSize: '1.5em',
          padding: '10px 20px',
          margin: '10px',
        }}
        onClick={() => redirectToPage('neaktivne')}
      >
        neaktivne akcije
      </button>
      
    </div>
  );
}

export default OdabirAkcija;
