package com.example.backend.korisnik.animal;

import com.example.backend.korisnik.positions.AnimalPosition;
import com.example.backend.korisnik.positions.AnimalPositionRepository;
import com.example.backend.korisnik.positions.AnimalPositionService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class AnimalService {
    private final AnimalRepository animalRepository;
    private final AnimalPositionService animalPositionService;
    private final AnimalPositionRepository animalPositionRepository;

    public AnimalService(AnimalRepository animalRepository, AnimalPositionService animalPositionService, AnimalPositionRepository animalPositionRepository) {
        this.animalRepository = animalRepository;
        this.animalPositionService = animalPositionService;
        this.animalPositionRepository = animalPositionRepository;
    }

    @Scheduled(fixedDelay = 600000)
    public void scheduledAddPositions() {
        addPositions();
    }

    public void addPositions() {
        List<AnimalPosition> allAnimals = animalPositionRepository.findAll();
        System.out.println(allAnimals.size());
        if (allAnimals.size() <= 200) {
            Random random = new Random();
            List<Long> allAnimalIds = findAllAnimalIds();
            long bound = 0;

            for (Long id : allAnimalIds) {
                if (id > bound) {
                    bound = id;
                }
            }

            for (long id = 1; id < bound + 1; id++) {
                Timestamp ts = new Timestamp(new Date().getTime());
                List<AnimalPosition> position = getSingleAnimalPositions(id);
                double newLatitude = position.get(random.nextInt(position.size())).getLatitude() + random.nextDouble(-0.1, 0.1);
                double newLongitude = position.get(random.nextInt(position.size())).getLongitude() + random.nextDouble(-0.1, 0.1);

                AnimalPosition newPosition = new AnimalPosition();
                newPosition.setTimeStamp(ts);
                newPosition.setLatitude(newLatitude);
                newPosition.setLongitude(newLongitude);
                newPosition.setAnimal(returnById(id));
                animalPositionRepository.save(newPosition);
            }
        }
    }

    public List<Long> findAllAnimalIds() {
        return animalRepository.findAllAnimalIds();
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

    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }

    public Animal getAnimalByName(String animalName) {
        Long id = animalName.split(", id: ")[1].equals("null") ? null : Long.parseLong(animalName.split(", id: ")[1]);
        return animalRepository.findById(id).orElseThrow(() -> new IllegalStateException("Animal with id " + id + " does not exist!"));
    }
}
