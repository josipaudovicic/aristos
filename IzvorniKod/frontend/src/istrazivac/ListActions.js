import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const ListActions = () => {
    const location = useLocation()
    const [actions, setActions] = useState(location.state?.actions);
    const username = location.state?.username;
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/explorer/actions` , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          username: username,
        },  
        }).then((response) => (response.json())).then((data) => (setActions(data))).catch((error) => console.error("Something went wrong" + error))
    })

    const handleClick = async (action) => { 
        try {
            console.log(action);
            navigate(`/explorer/action/${action.actionName}`, { state: {action: action, actions: actions, username: action.username}});
    
        } catch (error) {
            console.error('Error fetching action details:', error.message);
        }
      };


      const handleAction =  () => { 
        console.log(actions);
        navigate('/explorer/action/newAction', {state : {actions: actions, username: username}});
      };



    const listItemStyle = {
        cursor: 'pointer',
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease-in-out',
    };
    
    const bStyle = {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        padding: '6px 16px',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '30px',
    };


    const handleMouseOver = (e) => {
        e.currentTarget.style.backgroundColor = '#f0f0f0';
    };

    const handleMouseOut = (e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
    };

    return(
        <div>
            <div className='container' style={{ textAlign: 'center', marginTop: '20px' }}>
                <h2>Lista akcija:</h2>
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                {actions.map((action) => (
                <li
                    key={action.username}
                    onClick={() => handleClick(action)}
                    style={listItemStyle}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                >
                <strong>{action.actionName}:</strong> {action.username}
                </li>
                ))}
                </ul>
                <div>
                    <button onClick={handleAction} style={bStyle} title="Stvori novu akciju">+</button>
                </div>
            </div>
        </div>
    );
}

export default ListActions;

