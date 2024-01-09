package com.example.backend.korisnik.positions;

import com.example.backend.korisnik.animal.Animal;
import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@IdClass(AnimalPositionId.class)
public class AnimalPosition {
    @Id
    @ManyToOne
    @JoinColumn(name = "animal_id")
    private Animal animal;
    @Id
    private Timestamp timeStamp;
    private Double latitude;
    private Double longitude;

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

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
}
