import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

function InfoStranica() {
  const navigate = useNavigate();
  const location = useLocation();
  const actionName = location.state?.actionName;
  const username = location.state?.username;
  const actions = location.state?.actions;
  const sentRequest = location.state?.sentRequest;
  const [buttonEndStyle, setButtonEndStyle] = useState({
    padding: '18px 18px',
    fontSize: 20,
    cursor: 'pointer',
    margin: '10px',
    backgroundColor: '#C20000',
    transition: 'background-color 0.3s ease',
  });

  const redirectToPage = async (path) => {
      try {
      let response;
      if (path === "/explorer/action/info/tasks") {
        response = await fetch(`${BASE_URL}/explorer/action/info/tasks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            actionName: actionName,
          }, 
        });
      } else {
        response = await fetch(`${BASE_URL}/explorer/action/info/requests`);
      }

      const data = await response.json();
      console.log(path);
      console.log(data);
      if (path === "explorer/action/info/tasks") {
        navigate(`/${path}`, {state: {data: data, actionName: actionName, username: username}});
      } else {
        if (sentRequest === "true") {
          alert("Već ste poslali zahtjev za tragačima!");
        } else {
          navigate(`/${path}`, {state: {data: data, actionName: actionName, username: username, actions: actions, sentRequest: sentRequest}});
        }
      }

    } catch (error) {
      console.error(`Error fetching`, error.message);
    }
  };

  const handleEnd = () => {
      const confirmEnd = window.confirm("Jeste li sigurni da želite završiti akciju?");
    
      if (confirmEnd) {
        fetch(`${BASE_URL}/explorer/action/info/end`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ actionName: actionName }),
        })
        .then(() => {
          navigate('/explorer/actions', {state: {username: username, actions: actions}});
        })
        .catch(error => {
          console.error(`Error ending action`, error.message);
        });
      }
  };

  const regularButtonStyle = {
    padding: '18px 18px',
    fontSize: 20,
    cursor: 'pointer',
    margin: '10px',
  };

  const buttonEnd = {
    padding: '18px 18px',
    fontSize: 20,
    cursor: 'pointer',
    margin: '10px',
    backgroundColor: '#C20000',
    transition: 'background-color 0.3s ease', 
  };

  const hoverColor = '#7D0000';

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
      <button
        onClick={handleEnd}
        style={buttonEndStyle}
        onMouseEnter={() => {
          setButtonEndStyle({
            ...buttonEndStyle,
            backgroundColor: hoverColor,
          });
        }}
        onMouseLeave={() => {
          setButtonEndStyle({
            ...buttonEndStyle,
            backgroundColor: '#C20000',
          });
        }}
      >Završi akciju</button>
    </div>
  );
}

export default InfoStranica;