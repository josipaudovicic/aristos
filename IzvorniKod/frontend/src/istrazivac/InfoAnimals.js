import React, { useState }  from 'react';
import { useLocation } from 'react-router-dom';

function InfoAnimals() {
    const location = useLocation();
    const animal = location.state?.animal;
    const username = location.state?.username;
    const id = location.state?.id;
    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState([]);
    var src = null;

    console.log(animal.animalName);
    if (animal.animalName === "Sivi sokol") {
        src = '/animalImages/sivisokol.jpg';
    } else if (animal.animalName === "Smedi medvjed") {
        src = '/animalImages/smedimedvjed.jpg';
    } else if (animal.animalName === "Kuna bjelica") {
        src = '/animalImages/kunabjelica.jpg';
    } else {
        src = '/animalImages/sivivuk.jpg';
    }

    const imageStyle = {
        width: '400px',
        height: '300px',
    };

    const buttonStyle = {
        marginTop: '12px',
        padding: '8px 16px',
        fontSize: '16px',
        margin: '5px',
      };

    const textareaStyle = {
        borderRadius: '6px',
    };

    const commentStyles = {
        commentSection: {
          marginTop: '20px',
        },
        commentList: {
          listStyle: 'none',
          padding: '0',
        },
        commentItem: {
            textAlign: 'left',
            marginLeft: '25px',
        },
        commentText: {
          margin: '0',
          color: '#555',
        },
        commentHeader: {
            fontWeight: 'bold',
            marginBottom: '-10px',
            textAlign: 'left',
            marginLeft: '10px',
        },
      };

    const handleTextarea = (event) => {
        setComment(event.target.value);
      };
    
      const handleSave = () => {
        if (comment) {
            console.log(username);
            const newComment = `${username}: ${comment}`; 
            setCommentsList([...commentsList, newComment]);
            setComment('');
          }
        
        fetch(`/explorer/animals/species/${id}/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            username: username,
            comment: comment,
          },
        })
      };
    
      const handleQuit = () => {
        console.log('Quitting comment');
        setComment('');
      };

      const h2Style = {
        textAlign: 'center',
      };
    

    return(
        <div className='container'>
            <img src={src} alt="animal image" style={imageStyle}></img>
            <h2 style={h2Style}>{animal.animalName} id: {animal.id}</h2>
            <p>Latinski naziv: {animal.latinName}</p>
            <p>Opis: {animal.description}</p>
            {commentsList.length > 0 && (
        <div style={commentStyles.commentSection}>
          <p style={commentStyles.commentHeader}>Komentari:</p>
          <ul style={commentStyles.commentList}>
            {commentsList.map((comment, index) => (
              <li key={index} style={commentStyles.commentItem}>
                <p style={commentStyles.commentText}>{comment}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
            <p>
                <textarea style={textareaStyle} value={comment} onChange={handleTextarea} rows="4" cols="50" placeholder=" Napišite komentar ovdje..."></textarea>
                <button onClick={handleSave} style={{ ...buttonStyle, display: comment ? 'inline-block' : 'none' }} disabled={!comment}>Spremi komentar</button>
                <button onClick={handleQuit} style={{ ...buttonStyle, display: comment ? 'inline-block' : 'none' }} disabled={!comment}>Odustani</button>
            </p>
        </div>
    );
}

export default InfoAnimals;