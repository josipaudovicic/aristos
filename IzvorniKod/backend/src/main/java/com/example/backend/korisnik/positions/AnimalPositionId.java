package com.example.backend.korisnik.positions;


import com.example.backend.korisnik.animal.Animal;

import java.io.Serializable;
import java.sql.Timestamp;

public class AnimalPositionId implements Serializable {
    private Animal animal;
    private Timestamp timeStamp;

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    public Timestamp getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Timestamp timeStamp) {
        this.timeStamp = timeStamp;
    }
}
