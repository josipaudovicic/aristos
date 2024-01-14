package com.example.backend.korisnik.positions;

import com.example.backend.korisnik.animal.Animal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalPositionService {

    private final AnimalPositionRepository animalPositionRepository;

    @Autowired
    public AnimalPositionService(AnimalPositionRepository animalPositionRepository) {
        this.animalPositionRepository = animalPositionRepository;
    }

    public List<AnimalPosition> findByAnimal(Animal animal) {
        return animalPositionRepository.findByAnimal(animal);
    }
}
