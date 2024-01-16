import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PopisZadataka() {
    const navigate = useNavigate();
    const location = useLocation();
    const actionName = location.state?.actionName;
    const username = location.state?.username;
    const [tasks, setTasks] = useState([]);
    const [comments, setComments] = useState([]);


  useEffect(() => { 
    const fetchTasks = () => {
    try {
      fetch('/explorer/action/info/tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          actionName: actionName,
        },
    }).then((response1) => response1.json())
      .then((data) => {setTasks(data);
          fetch('/explorer/action/info/tasks/comments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
      }).then((response2) => response2.json())
        .then((data2) => setComments(data2))
        .catch((error) => console.error('Error fetching data:', error));
    })
      .catch((error) => console.error('Error fetching data:', error));

    } catch (error) {
      console.error('Error:', error);
    }};
    
    fetchTasks();
  }, []); 


  const handleNewTask = () => {
      navigate('/explorer/action/info/tasks/newTask', {state: { actionName: actionName}});
  };

  const handleDelete = (task, index) =>{
    const updatedTasksList = [...tasks];
    updatedTasksList.splice(index, 1);
    setTasks(updatedTasksList);
    console.log(task);
    try {
        fetch(`/explorer/action/info/tasks/delete`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        });
      } catch (error) {
        console.error('Error deleting task:', error);
      }
  }

  const handleComment = () => {
    
  }

  const handleEdit = (task) => {
    navigate('/explorer/action/info/tasks/editTask', {state: { task: task }});
  };

  const buttonStyle = {
    marginLeft: '393px',
    padding: '8px 16px',
    fontSize: '16px',
    marginTop: '-72px',
    cursor: 'pointer',
  };

  const bStyle = {
    marginLeft: '393px',
    padding: '8px 16px',
    fontSize: '16px',
    marginTop: '2px',
    cursor: 'pointer',
  };

  const button2Style = {
    marginLeft: '5px',
    marginRight: '350px',
    padding: '8px 16px',
    fontSize: '16px',
    marginTop: '6px',
    cursor: 'pointer',
  };

 const buttonStyle2 = {
    padding: '8px 16px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'block',
    margin: '0 auto',
  };

  const ul = {
    listStyleType: 'none',
    padding: '0',
  };

  const li = {
    border: '1px solid #ccc',
    marginBottom: '3px',
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
  };

  const container = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    width: '550px',
  };

  const pStyle = {
    margin: '3px',
  };

  const h2style = {
    textAlign: 'center',
  };

  return (
    <div style={container}>
      <h2 style={h2style}>Lista zadataka:</h2> 
      <ul style={ul}>
        {tasks.map((task, index) => (
          <li style={li} key={index}>
            <p style={pStyle}><b>zadatak: </b>{task.taskText} </p> 
            <p style={pStyle}><b>životinja:</b> {task.animalName} </p>
            <p style={pStyle}><b>tragač:</b> {task.username} </p>
            <p style={pStyle}><b>vozilo:</b> {task.vehicleName} </p>
            <p style={pStyle}><b>završeno:</b> {task.done == "true" ? '✔️' : '❌'} </p>
            <button style={bStyle} onClick={() => handleDelete(task, index)}>Obriši</button>
            <button style={buttonStyle} onClick={() => handleEdit(task)}>Uredi</button>
            <button style={button2Style} onClick={() => handleComment(task)}>Dodaj komentar</button>
          </li>
        ))}
      </ul>

      <button style={buttonStyle2} onClick={handleNewTask}>Dodaj novi zadatak</button>
      
    </div>
  );
}

export default PopisZadataka;