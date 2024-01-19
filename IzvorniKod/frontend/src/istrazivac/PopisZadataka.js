import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

function PopisZadataka() {
    const navigate = useNavigate();
    const location = useLocation();
    const actionName = location.state?.actionName;
    const username = location.state?.username;
    const [tasks, setTasks] = useState([]);
    const [taskId, setTaskId] = useState(0);
    const [prevTaskId, setPrevTaskId] = useState(0)
    const [comments, setComments] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const response1 = await fetch(`${BASE_URL}/explorer/action/info/tasks`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              actionName: actionName,
            },
          });
          const data = await response1.json();
          setTasks(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
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
        fetch(`${BASE_URL}/explorer/action/info/tasks/delete`, {
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


  const handleViewComments = (task) => {
    //console.log(task);
    fetch(`${BASE_URL}/explorer/action/info/tasks/comments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        taskId: task.taskId,
      },
    })
      .then((response) => response.json())
      .then((data) => {
          setComments(data);
          console.log(task.taskId)
          setTaskId(task.taskId);
          if (task.taskId === prevTaskId || prevTaskId === 0 || !showDropdown){
            setShowDropdown((prevShowDropdown) => !prevShowDropdown);
          }
          setPrevTaskId(task.taskId)
        })
      .catch((error) => console.error('Error fetching user data:', error));
  };

  const buttonStyle = {
    marginLeft: '393px',
    padding: '8px 16px',
    fontSize: '16px',
    marginTop: '3px',
    cursor: 'pointer',
  };

  const buttonstyle = {
    border: "none",
    background: "none",
    color: "black",
    padding: "0",
    cursor: "pointer",
    textAlign: "left",
    marginLeft: "3px",
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
    overflowY: 'auto', 
    maxHeight: '700px',
  };

  const pStyle = {
    margin: '3px',
  };

  const h2style = {
    textAlign: 'center',
  };

  function Dropdown ({ task, comments }) {
    const [commentText, setCommentText] = useState('');

    const dropdownStyle = {
      position: 'absolute',
      top: '165px',
      left: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      borderRadius: '4px',
      padding: '8px',
      zIndex: '1000',
      border: '1px solid #ddd',
      minWidth: '280px',
    };
  
    const optionStyle = {
      cursor: 'pointer',
      padding: '8px',
      borderBottom: '1px solid #eee',
      transition: 'background-color 0.3s',
      Width: '180px',
    };

    const commentInputStyle = {
      marginTop: '8px',
      width: '95%',
    };

    const button = {
      fontSize: '13px',
      padding: '8px 10px',
      marginBottom:'10px',
      marginLeft:'7px',
    };

    const handleCommentText = (e) => {
      setCommentText(e.target.value);
    };

    const handleComment = (task) => {
      if (commentText) {
        const newComment = `${username}: ${commentText}`; 
        setComments([...comments, newComment]);
        setCommentText('');
      }

    //let taskId = '';
    /*if (typeof comments[0] === 'object' && comments[0] !== null){
      taskId = comments[0].taskId;
    } else {
      taskId = '';
    }*/
    console.log(taskId);
    
    fetch(`${BASE_URL}/explorer/action/info/tasks/saveComment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, comment: commentText, taskId: taskId}),
    })
    };
    
    return (
      <div style={dropdownStyle}>
        <p style={{ margin: '0', fontWeight: 'bold' }}>komentari:</p>
        {comments.map((comment) => (
        <div key={comment.comment} style={optionStyle}>
          {typeof comment === 'object' && comment !== null ? `${comment.username}: ${comment.comment}` : comment}
        </div>))}
        <input
          type="text"
          placeholder="Unesite komentar..."
          value={commentText}
          onChange={handleCommentText}
          style={commentInputStyle}
        />
        <button style={{ ...button, display: commentText ? 'inline-block' : 'none' }} disabled={!commentText} onClick={() => handleComment(task)}>Dodaj komentar</button>
      </div>
    );
  }
  

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
            <p style={pStyle}><b>završeno:</b> {task.done === "true" ? '✔️' : '❌'} </p>
            <button style={buttonstyle} onClick={() => handleViewComments(task)}><b><u>komentari</u></b></button>
            {showDropdown && <Dropdown task={task} comments={comments} />}
            <button style={buttonStyle} onClick={() => handleDelete(task, index)}>Obriši</button>
          </li>
        ))}
      </ul>

      <button style={buttonStyle2} onClick={handleNewTask}>Dodaj novi zadatak</button>
      
    </div>
  );
}

export default PopisZadataka;