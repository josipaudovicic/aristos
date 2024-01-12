package com.example.backend.korisnik.animal;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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

    public Map<String, String> findAnimalById(Long id) {
        Animal animal = animalRepository.findById(id).orElseThrow(() -> new IllegalStateException("Animal with id " + id + " does not exist!"));
        Map<String, String > kaoAnimal = new java.util.HashMap<>();
        kaoAnimal.put("id", animal.getAnimalId().toString());
        kaoAnimal.put("animalName", animal.getAnimalName());
        kaoAnimal.put("latinName", animal.getLatinName());
        kaoAnimal.put("description", animal.getDescription());
        return kaoAnimal;
    }

    public Animal returnById(Long id) {
        return animalRepository.findById(id).orElseThrow(() -> new IllegalStateException("Animal with id " + id + " does not exist!"));
    }
}
