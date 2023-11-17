import React from 'react';
import { useNavigate } from 'react-router-dom';

function TwoButtonRedirectComponent() {
  const navigate = useNavigate();

  const redirectToPage = async (path) => {
      try {
      // Send a GET request to the backend endpoint for users or requests
      //console.log(path);
      let response;
      if (path === "getUsers") {
        response = await fetch(process.env.REACT_APP_API_BASE_URL + `/admin/getAllUsers`);
      } else {
        response = await fetch(process.env.REACT_APP_API_BASE_URL + `/admin/toConfirm`);
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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Choose an Option:</h2>
      <button
        style={{
          fontSize: '1.5em',
          padding: '10px 20px',
          margin: '10px',
        }}
        onClick={() => redirectToPage('getUsers')}
      >
        View Users
      </button>
      <button
        style={{
          fontSize: '1.5em',
          padding: '10px 20px',
          margin: '10px',
        }}
        onClick={() => redirectToPage('requests')}
      >
        View Requests
      </button>
    </div>
  );
}

export default TwoButtonRedirectComponent;
