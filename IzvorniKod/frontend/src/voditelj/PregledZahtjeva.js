import React, { useState, useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';

function PregledZahtjeva(){
    //dolazi mu zahtjev od istrazivaca
    //prikazuje se ime akcije i opis trazenog tragaca
    //klikom na zahtjev odlazi na listu svojih tragaca u postaji 
    //tamo dodaje tragace i tako obraduje zahtjev


    const [requests, setRequests] = useState([]);
    

    useEffect(() => {

    const fetchRequests = async () => {
      try {
        const response = await fetch('');
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

    const navigate = useNavigate();
    const redirectToPage = async (path) => {
        try {
            let response;
            if (path === 'manager/requests/mytrackers') {
                response = await fetch(`manager/requests/mytrackers`);
            }
            const data = await response.json();
            navigate(`/${path}`, { state: { users: data } });
        }catch (error) {
            console.error(`Error fetching data:`, error.message);
          }
        };
      

    return (
        <div>
            <h2>Zahtjevi</h2>
            <ul>
                {requests.map((request) => (
                    <li key={request.actionName} onClick={() => redirectToPage('manager/requests/mytrackers')} style={{ cursor: 'pointer' }}>
                        <strong>{request.actionName}</strong> - {request.description}
                    </li>
                ))}
            </ul>
          
        </div>
      );
}
export default PregledZahtjeva;