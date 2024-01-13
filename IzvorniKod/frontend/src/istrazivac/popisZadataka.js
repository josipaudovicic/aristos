import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function PopisZadataka() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch users with confirmed attribute set to NULL
        const fetchTasks = async () => {
          try {
            const response = await fetch('/explorer/allTasks');
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              setTasks(data);
            } else {
              console.error('Failed to fetch Tasks');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchTasks();
      }, []); 

      const redirectToPage = async (path) => {
        try {
        let response;
        if (path === "noviZd"){
            response = await fetch(`/explorer/createNewTask`);
        }else{
            response = await fetch(`/explorer/Task`);
        }
            const data = await response.json();
            navigate(`/${path}`, {state: {tasks: data}});
  
      } catch (error) {
            console.error(`Error fetching`, error.message);
      }
    };

  

  const handleEdit = () => {
    redirectToPage('/explorer/action/info/tasks/editTask')
  };

  const handleDelete = async() =>{
    try {
        await fetch(`/explorer/tasks/`, {
          method: 'DELETE',
        });
        navigate('/explorer/allTasks');
      } catch (error) {
        console.error('Error deleting task:', error);
      }
  }

  const handleComment = async() => {
      //nije gotovo
  }

  const CUTTING_EXPRESSION = /\s+[^\s]*$/;

    const createShortcut = (text, limit) => {
        if (text.length > limit) {
            const part = text.slice(0, limit - 3);
            if (part.match(CUTTING_EXPRESSION)) {
                return part.replace(CUTTING_EXPRESSION, ' ...');
            }
            return part + '...';
        }
        return text;
    };

    const Component = ({text, limit}) => {
        const shortcut = createShortcut(text, limit);
        return (
            <div title={text}>{shortcut}</div>
        );
    };

  const buttonStyle = {
    flex: '1', 
    marginLeft: '8px',
    padding: '8px 16px',
    fontSize: '16px',
    marginTop: '12px',
  };

  const buttonStyle2 = {
    flex: '1', 
    marginLeft: '8px',
    padding: '8px 16px',
    fontSize: '16px',
    marginTop: '12px',
  };

  return (
    <div>
      <h2>Lista zadataka:</h2> 
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ cursor: 'pointer' }}>
            <strong>opis:</strong> <Component text={task.description} limit={17}/>
            <button style={buttonStyle} onClick={() => handleEdit(task.id)}>Uredi</button>
            <button style={buttonStyle} onClick={() => handleDelete(task.id)}>Obriši</button>
            <button style={buttonStyle} onClick={() => handleComment(task.id)}>Dodaj komentar</button>
          </li>
        ))}
      </ul>

      <button style={buttonStyle2} onClick={() => redirectToPage('/explorer/action/info/tasks/newTask')}>Dodaj novi zadatak</button>
      
    </div>
  );
}

export default PopisZadataka;