package com.example.backend.korisnik.positions;


import com.example.backend.korisnik.animal.Animal;

import java.io.Serializable;
import java.sql.Timestamp;

public class AnimalPositionId implements Serializable {
    private Timestamp timeStamp;
    private Long animal;

    public Long getAnimal() {
        return animal;
    }

    public void setAnimal(Long animal) {
        this.animal = animal;
    }

    public Timestamp getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Timestamp timeStamp) {
        this.timeStamp = timeStamp;
    }
}
