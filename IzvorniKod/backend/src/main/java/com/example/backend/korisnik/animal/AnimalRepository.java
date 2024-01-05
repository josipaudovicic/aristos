package com.example.backend.korisnik.animal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {

    @Query("SELECT DISTINCT a.animalName FROM Animal a")
    List<String> findAllDistinctAnimalNames();
}
