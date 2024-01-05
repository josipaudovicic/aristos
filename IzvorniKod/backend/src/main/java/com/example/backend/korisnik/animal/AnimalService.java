package com.example.backend.korisnik.animal;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalService {
    private final AnimalRepository animalRepository;

    public AnimalService(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    public List<String> findAllDistinctAnimalNames() {
        return animalRepository.findAllDistinctAnimalNames();
    }
}
