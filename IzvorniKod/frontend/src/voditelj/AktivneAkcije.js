import React, { useState, useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';


function PregledAktivnihAkcija(){
    //pregled aktivnih akcija
    //klikom na akciju odlazi na mogucnost dodavanja tragača na akciju bez zahtjeva od istrazivaca

    const [actions, setActions] = useState([]);


    useEffect(() => {

    const fetchActions = async () => {
      try {
        const response = await fetch('');
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setActions(data);
        } else {
          console.error('Failed to fetch actions');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchActions();
    }, []);

    //TODO: UVIJEK KORISTITI useLocation za prijenos podataka izmedu stranica

    const navigate = useNavigate();
    const redirectToPage = async (path) => {
        try {
            let response;
            if (path === 'manager/activeActions/mytrackers') {
                response = await fetch(`manager/activeActions/mytrackers`);
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
                {actions.map((action) => (
                    <li key={action.name} onClick={() => redirectToPage('manager/activeActions/mytrackers')} style={{ cursor: 'pointer' }}>
                        <strong>{action.name}</strong> - lokacija:{action.location}
                    </li>
                ))}
            </ul>
        </div>
      );
}
export default PregledAktivnihAkcija;