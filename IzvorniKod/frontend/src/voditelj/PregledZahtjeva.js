import React, { useState, useEffect }  from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PregledZahtjeva() {
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state.username;
    const [requests, setRequests] = useState([]);
    
    useEffect(() => {
      const fetchRequests = () => {
        fetch(`/manager/requests`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json', 
            username: username,
          },
        }) 
        .then((response) => response.json())
        .then((data) => {setRequests(data);})
        .catch((error) => console.error('Error fetching requests data:', error));
    };

    fetchRequests();
  }, []);

    const handleClick = (request) => {
      console.log("Decided to add trackers to action");
      navigate(`/manager/requests/trackers`, {state: { vehicles: request.slice(2, request.length), username : username , actionId: request[1]}});
    };
      
    const li = {
      marginBottom: '3px',
      padding: '5px',
      display: 'flex',
      flexDirection: 'column',
      pointer: 'cursor',
      marginLeft: '30px',
    };
  
    const ul = {
      listStyleType: 'none',
      padding: '0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease-in-out',
      
    };
  
    const container = {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '15px',
      width: '450px',
      overflowY: 'auto', 
      maxHeight: '700px',
    };
  
    const h2style = {
      textAlign: 'center',
    };
  

    return (
        <div style={container}> 
            <h2 style={h2style}>Zahtjevi</h2>
            <ul style={ul}>
                {requests.map((request) => (
                    <ul key={request[1]} onClick={() => handleClick(request)} style={{...li ,cursor: 'pointer' }}>
                        <strong>{request[0]}</strong>
                        {request.slice(2, request.length).map((vehicle, index) => (
                            <li key={index}>
                            <strong>{vehicle}</strong>
                            </li>
                        ))}
                    </ul>
                ))}
            </ul>
          
        </div>
      );
}
export default PregledZahtjeva;