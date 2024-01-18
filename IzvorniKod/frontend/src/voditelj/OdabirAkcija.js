import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OdabirAkcija() {
  
  //TODO: UVIJEK KORISTITI useLocation za prijenos podataka izmedu stranica

  const navigate = useNavigate();
  const location = useLocation();

  const redirectToPage = async (path) => {
      try {
      let response;
      console.log("Username prije odabira tipa akcije: ", location.state.username);
      if (path === "inactiveActions") {
        response = await fetch(`/manager/inactiveActions`, { 
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json', 
          'username': location.state.username
        },
      });
      } else {
        response = await fetch(`/manager/activeActions`, { 
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json', 
            'username': location.state.username
          },
      });
      }
      const data = await response.json();
      console.log("odabrane akcije: ", path);
      console.log("fetchane akcije: ", data);
      console.log("Username after choosing the type of actions: ", location.state.username);
      navigate(`/manager/actions/${path}`, {state: {users: data, username: location.state.username}}); // Mozda da se zove data, a ne users jer mogu slati i akcije umjesto korisnika

    } catch (error) {
      console.error(`Error fetching actions:`, error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }} class='container'>
      <h2>Odaberi opciju:</h2>
      <button
        style={{
          fontSize: '1.5em',
          padding: '10px 20px',
          margin: '10px',
        }}
        onClick={() => redirectToPage('activeActions')} // ispred ovoga staviti /manager i mozda promjeniti na engleski
      >
        aktivne akcije
      </button>
      <button
        style={{
          fontSize: '1.5em',
          padding: '10px 20px',
          margin: '10px',
        }}
        onClick={() => redirectToPage('inactiveActions')} // ispred ovoga staviti /manager i mozda promjeniti na engleski
      >
        neaktivne akcije
      </button>
      
    </div>
  );
}

export default OdabirAkcija;
