import React, { useState }  from 'react';
import { useLocation } from 'react-router-dom';

function InfoAnimals() {
    const location = useLocation();
    const animal = location.state?.animal;
    const [comment, setComment] = useState('');
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

    const handleTextarea = (event) => {
        setComment(event.target.value);
      };
    
      const handleSave = () => {
        console.log('Saving comment:', comment);
        setComment('');
      };
    
      const handleQuit = () => {
        console.log('Quitting comment');
        setComment('');
      };
    

    return(
        <div className='container'>
            <img src={src} alt="animal image" style={imageStyle}></img>
            <h2>{animal.animalName} id: {animal.id}</h2>
            <p>Latinski naziv: {animal.latinName}</p>
            <p>Opis: {animal.description}</p>
            <p>
                <textarea style={textareaStyle} value={comment} onChange={handleTextarea} rows="4" cols="50" placeholder=" Napišite komentar ovdje..."></textarea>
                <button onClick={handleSave} style={{ ...buttonStyle, display: comment ? 'inline-block' : 'none' }} disabled={!comment}>Spremi komentar</button>
                <button onClick={handleQuit} style={{ ...buttonStyle, display: comment ? 'inline-block' : 'none' }} disabled={!comment}>Odustani</button>
            </p>
        </div>
    );
}

export default InfoAnimals;