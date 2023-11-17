import React, { useState, useEffect } from 'react';

function Requests() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users with confirmed attribute set to NULL
    const fetchUsers = async () => {
      try {
        const response = await fetch('process.env.REACT_APP_API_BASE_URL/admin/toConfirm');
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUsers(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []); 
  
  const handleConfirm = async (userName) => {
    try {
      const response = await fetch(`process.env.REACT_APP_API_BASE_URL/admin/users/${userName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update the local state to reflect the change
        setUsers((prevUsers) => prevUsers.filter((user) => user.username !== userName));
      } else {
        console.error('Failed to update user confirmation status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDecline = async (userName) => {
    try {
      const response = await fetch(`process.env.REACT_APP_API_BASE_URL/admin/users/${userName}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the user from the local state
        setUsers((prevUsers) => prevUsers.filter((user) => user.username !== userName));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Requests</h2>
      <ul>
        {users.map((user) => (
          <li key={user.username}>
            {user.username} - {user.role}
            <button onClick={() => handleConfirm(user.username)}>Confirm</button>
            <button onClick={() => handleDecline(user.username)}>Decline</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Requests;
