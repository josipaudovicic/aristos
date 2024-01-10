import React  from 'react';
import { useLocation } from 'react-router-dom';

function InfoAnimals() {
    const location = useLocation();
    const animal = location.state?.animal;
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



    return(
        <div className='container'>
            <img src={src}></img>
        </div>
    );
}

export default InfoAnimals;