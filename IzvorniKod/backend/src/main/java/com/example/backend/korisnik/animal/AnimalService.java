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

    public List<String> findSpecies(String animal) {
        List<Animal> animals = animalRepository.findByAnimalName(animal);
        List<String> animalNames = new java.util.ArrayList<>();
        for (Animal a : animals) {
            animalNames.add(a.getAnimalName() + ", id: " +  a.getAnimalId());
        }
        return animalNames;
    }
}
