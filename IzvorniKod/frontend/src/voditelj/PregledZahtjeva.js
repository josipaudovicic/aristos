import React, { useState, useEffect }  from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PregledZahtjeva(){
    //dolazi mu zahtjev od istrazivaca
    //prikazuje se ime akcije i opis trazenog tragaca
    //klikom na zahtjev odlazi na listu svojih tragaca u postaji 
    //tamo dodaje tragace i tako obraduje zahtjev

    const location = useLocation();
    const [requests, setRequests] = useState([]);
    
    console.log("Viewing list of requests for actions");
    useEffect(() => {

    const fetchRequests = async () => {
      try {
        const response = await fetch(`/manager/requests`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json', 
            'username': location.state.username
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setRequests(data);
        } else {
          console.error('Failed to fetch requests');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRequests();
    }, []);

    //TODO: UVIJEK KORISTITI useLocation za prijenos podataka izmedu stranica

    const navigate = useNavigate();
    const redirectToPage = async (path, requestId) => {
        location.state.requestId = requestId;
        try {
            let response;
            if (path === 'manager/mytrackers') {
                response = await fetch(`manager/mytrackers`);
            }
            const data = await response.json();
            navigate(`/${path}`, { state: { requests: data } });
        }catch (error) {
            console.error(`Error fetching data:`, error.message);
          }
        };
      

    return (
        <div>
            <h2>Zahtjevi</h2>
            <ul>
                {requests.map((request) => (
                    <li key={request.name} onClick={() => redirectToPage('manager/requests/mytrackers', request.id)} style={{ cursor: 'pointer' }}>
                        <strong>{request.name}</strong> - {request.username}
                    </li>
                ))}
            </ul>
          
        </div>
      );
}
export default PregledZahtjeva;