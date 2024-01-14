package com.example.backend.korisnik.animal;

import com.example.backend.korisnik.positions.AnimalPosition;
import com.example.backend.korisnik.positions.AnimalPositionService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class AnimalService {
    private final AnimalRepository animalRepository;
    private final AnimalPositionService animalPositionService;

    public AnimalService(AnimalRepository animalRepository, AnimalPositionService animalPositionService) {
        this.animalRepository = animalRepository;
        this.animalPositionService = animalPositionService;
    }

    public List<String> findAllDistinctAnimalNames() {
        return animalRepository.findAllDistinctAnimalNames();
    }

    public List<String> findSpecies(String animal) {
        if (Objects.equals(animal, "no animal")) {
            List<Animal> allAnimals = animalRepository.findAll();
            List<String> animalNames = new java.util.ArrayList<>();
            for (Animal a : allAnimals) {
                animalNames.add(a.getAnimalName() + ", id: " +  a.getAnimalId());
            }
            return animalNames;
        }
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

    public List<AnimalPosition> getAnimalPositions(String animalName) {
        List<Animal> animal = animalRepository.findByAnimalName(animalName);
        List<AnimalPosition> animalPositions = new java.util.ArrayList<>();
        for (Animal a : animal) {
            animalPositions.addAll(animalPositionService.findByAnimal(a));
        }
        return animalPositions;
    }

    public List<AnimalPosition> getSingleAnimalPositions(Long id) {
        Animal animal = animalRepository.findById(id).orElseThrow(() -> new IllegalStateException("Animal with id " + id + " does not exist!"));
        return animalPositionService.findByAnimal(animal);
    }
}
