import React, { useState, useEffect }  from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function PregledAktivnihAkcija(){
    //pregled aktivnih akcija
    //klikom na akciju odlazi na mogucnost dodavanja tragača na akciju bez zahtjeva od istrazivaca

    const [actions, setActions] = useState([]);
    const location = useLocation();
    console.log("data on this location ", location.state);

    useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await fetch(`/manager/activeActions`, { 
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json', 
            'username': location.state.username
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("fetchane akcije 2. put: ", data);
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
    const redirectToPage = async (path, actionId) => {
            navigate(`/${path}`, { state: { actionId: actionId, username: location.state.username} });
        };
      
        const listItemStyle = {
          cursor: 'pointer',
          marginBottom: '10px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          transition: 'background-color 0.3s ease-in-out',
      };

      const handleMouseOver = (e) => {
        e.currentTarget.style.backgroundColor = '#f0f0f0';
    };

    const handleMouseOut = (e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
    };

    const ul = {
      listStyleType: 'none',
      padding: '0',
    };

    return (
        <div className='container'>
            <h2>Aktivne akcije</h2>
            <ul style={ul}>
                {actions ? actions.map((action) => (
                    <li key={action.name} onClick={() => redirectToPage('manager/activeActions/mytrackers', action.id)} style={listItemStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        <strong>{action.name}</strong>
                    </li>
                )) : <p>Nema aktivnih akcija.</p>}
            </ul>
        </div>
      );
}
export default PregledAktivnihAkcija;