import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

function TwoButtonRedirectComponent() {
  const navigate = useNavigate();

  const redirectToPage = async (path) => {
      try {
      // Send a GET request to the backend endpoint for users or requests
      //console.log(path);
      let response;
      if (path === "getUsers") {
        response = await fetch(`${BASE_URL}/admin/getAllUsers`);
      } else {
        response = await fetch(`${BASE_URL}/admin/toConfirm`);
      }

      const data = await response.json();
      navigate(`/${path}`, {state: {users: data}});

      // Assuming you have a route for both users and requests
      // Pass the fetched data as a state to the new route
    } catch (error) {
      console.error(`Error fetching users:`, error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '-150px' }}>
      <h2 style={{marginBottom: '5px'}}>Odaberi opciju:</h2>
      <button
        style={{
          fontSize: '1.5em',
          padding: '10px 20px',
          marginTop: '20px',
          width: '230px',
        }}
        onClick={() => redirectToPage('getUsers')}
      >
        Pregled Korisnika
      </button> <br></br>
      <button
        style={{
          fontSize: '1.5em',
          padding: '10px 20px',
          marginTop: '20px',
          width: '230px',
        }}
        onClick={() => redirectToPage('requests')}
      >
        Pregled Zahtjeva
      </button>
    </div>
  );
}

export default TwoButtonRedirectComponent;
