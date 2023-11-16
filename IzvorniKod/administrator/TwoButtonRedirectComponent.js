import React from 'react';
import { useHistory } from 'react-router-dom';

function TwoButtonRedirectComponent() {
  const history = useHistory();

  const redirectToPage = async (path) => {
    try {
      // Send a GET request to the backend endpoint for users or requests
      const response = await fetch(`/backend/users`);
      const data = await response.json();

      // Assuming you have a route for both users and requests
      history.push(`/${path}`, { data }); // Pass the fetched data as a state to the new route
    } catch (error) {
      console.error(`Error fetching users:`, error.message);
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
        onClick={() => redirectToPage('pregled_svih_korisnika')}
      >
        View Users
      </button>
      <button
        style={{
          fontSize: '1.5em',
          padding: '10px 20px',
          margin: '10px',
        }}
        onClick={() => redirectToPage('Requests')}
      >
        View Requests
      </button>
    </div>
  );
}

export default TwoButtonRedirectComponent;
