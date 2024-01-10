import React from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

const ListActions = () => {
    const location = useLocation()
    const actions = location.state?.users || [];
    console.log(actions);
    const navigate = useNavigate();

    const handleClick = async (action) => { 
        try {
            console.log(action);
            navigate(`/explorer/action/${action.actionName}`, { state: {action: action, actions: actions, username: action.username}});
    
        } catch (error) {
            console.error('Error fetching action details:', error.message);
        }
      };


    const buttonStyle = {
        position: 'fixed',
        top: '10px',
        left: '10px',
        padding: '8px 16px',
        backgroundColor: '#5C5C5C',
        color: '#fff',
        borderRadius: '4px',
        cursor: 'pointer',
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
                <strong>akcija:</strong> {action.username}
                </li>
                ))}
                </ul>
                <div>
                    <Link to="/explorer/newAction">
                        <button style={bStyle} title="Stvori novu akciju">+</button>
                    </Link>
                </div>

                <div>
                    <Link to="/explorer"> {/*!!!!!! ne koristi Link nego navigate i prosljeduj mi username*/}
                        <button style={buttonStyle}>Početna</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ListActions;

