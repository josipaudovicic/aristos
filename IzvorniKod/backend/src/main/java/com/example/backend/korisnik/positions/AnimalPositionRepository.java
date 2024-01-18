package com.example.backend.korisnik.positions;

import com.example.backend.korisnik.animal.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalPositionRepository extends JpaRepository<AnimalPosition, AnimalPositionId> {

    List<AnimalPosition> findByAnimal(Animal animal);
}
