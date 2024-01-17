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
      

    return (
        <div>
            <h2>Zahtjevi</h2>
            <ul>
                {requests.map((request) => (
                    <ul key={request[1]} onClick={() => handleClick(request)} style={{ cursor: 'pointer' }}>
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