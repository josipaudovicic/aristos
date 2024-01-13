package com.example.backend.korisnik;

import com.example.backend.korisnik.HelpingTables.BelongsToStation;
import com.example.backend.korisnik.HelpingTables.BelongsToStationId;
import com.example.backend.korisnik.HelpingTables.BelongsToStationRepository;
import com.example.backend.korisnik.station.Station;
import com.example.backend.korisnik.station.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminServiceJpa {
    private final UserRepository userRepository;
    private final StationRepository stationRepository;
    private final BelongsToStationRepository belongsToStationRepository;
    @Autowired
    public AdminServiceJpa(UserRepository user_repository, StationRepository station_repository, BelongsToStationRepository belongs_to_station_repository) {
        this.userRepository = user_repository;
        this.stationRepository = station_repository;
        this.belongsToStationRepository = belongs_to_station_repository;
    }

    public List<Users> findAllUsers() {
        System.out.println(userRepository.findAll());
        return userRepository.findAll();
    }


    //This also removes all stations that already have a manager
    public List<Map<String, String>> findAllStations() {
        List<Station> allStations = stationRepository.findAll();

        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());

        for (Station station : allStations) {
            if (this.stationHasManager(station.getStationName()) == false) {
                Map<String, String> kaoStation = new HashMap<>();
                kaoStation.put("station_id", station.getStationId().toString());
                kaoStation.put("station_name", station.getStationName());
                returning.add(kaoStation);
            }
        }
        return returning;
    }

    public List<Map<String, String>> getRegisteredUsers() {
        List<Users> Users= userRepository.findAll();
        List<Users> registered = Users.stream().filter(user -> (user.isEmailCheck() && user.isAdminCheck() && user.getRole().getId() != 1)).collect(Collectors.toList());

        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (Users user : registered){
            Map<String, String> kaoUser = new HashMap<>();
            kaoUser.put("username",user.getUsername());
            kaoUser.put("email",user.getEmail());
            kaoUser.put("name",user.getName());
            kaoUser.put("surname",user.getSurname());
            kaoUser.put("password",user.getPassword());
            kaoUser.put("role",user.getRole().getRoleName());
            kaoUser.put("file",user.getPhoto());
            returning.add(kaoUser);
        }
        return returning;
    }

    public Map<String, String> userById(String id) {
        Users user = userRepository.getReferenceById(id);
        Map<String, String> kaoUser = new HashMap<>();
        kaoUser.put("username",user.getUsername());
        kaoUser.put("email",user.getEmail());
        kaoUser.put("name",user.getName());
        kaoUser.put("surname",user.getSurname());
        kaoUser.put("password",user.getPassword());
        kaoUser.put("role",user.getRole().getRoleName());
        kaoUser.put("file",user.getPhoto());
        return kaoUser;
    }

    public Users getUserById(String username) {
        if (userRepository.existsById(username)) {
            return userRepository.getReferenceById(username);
        } else {
            return null;
        }
    }

    public List<Map<String, String>> getUsersToConfirm() {
        List<Users> allUsers = this.findAllUsers();
        List<Users> listToConfirm = allUsers.stream().filter(user -> (user.getRole().getRoleName().equals("Voditelj postaje")
                || user.getRole().getRoleName().equals("Istraživač")) && !user.isAdminCheck()).collect(Collectors.toList());


        List<Map<String, String>> kaoUseri = new java.util.ArrayList<>(List.of());
        for (Users user : listToConfirm){
            Map<String, String> kaoUser = new HashMap<>();
            kaoUser.put("username",user.getUsername());
            kaoUser.put("email",user.getEmail());
            kaoUser.put("name",user.getName());
            kaoUser.put("surname",user.getSurname());
            kaoUser.put("password",user.getPassword());
            kaoUser.put("role",user.getRole().getRoleName());
            kaoUser.put("file",user.getPhoto());
            kaoUseri.add(kaoUser);
        }
        return kaoUseri;
    }

    public boolean stationHasManager(String stationName) {
        Long id = null;

        for (Station station : stationRepository.findAll()) {
            if (station.getStationName().equals(stationName)) {
                id = station.getStationId();
                break;
            }
        }

        if (id == null) {
            throw new IllegalStateException("Station with that name does not exist.");
        } else {
            long primitive_id = id.longValue();
            List<BelongsToStation> pairsToObserve = belongsToStationRepository.findAll().stream().filter(pair -> (pair.getStationId().longValue() == primitive_id)).collect(Collectors.toList());

            for (BelongsToStation pair : pairsToObserve) {
                String username = pair.getUserName();

                if (userRepository.getReferenceById(username).getRole().getRoleName().equals("Voditelj postaje")) {
                    return true;
                }
            }

        }
        return false;
    }


    public boolean confirmUser(Users user, String stationName) {
        String username = user.getUsername();
        Users user_confirm = userRepository.getReferenceById(username);
        user_confirm.setAdminCheck(true);

        if (stationName != null) {
            if (this.stationHasManager(stationName) == true) {
                return false;
            } else {
                Long id = null;
                for (Station station : stationRepository.findAll()) {
                    if (station.getStationName().equals(stationName)) {
                        id = station.getStationId();
                        break;
                    }
                }
                System.out.println("Station has no manager. Save new.");
                BelongsToStation newEntry = new BelongsToStation(username, id);
                belongsToStationRepository.save(newEntry);
            }

        }
        userRepository.save(user_confirm);
        return true;
    }

    public boolean delete(Users user) {
        String username = user.getUsername();

        if (userRepository.existsById(username)) {
            for (BelongsToStation pair : belongsToStationRepository.findAll()) {
                if (pair.getUserName().equals(username)) {
                    belongsToStationRepository.delete(pair);
                    break;
                }
            }
            userRepository.deleteById(username);
            return true;
        } else {
            return false;
        }
    }

    public boolean setManagerStation(Users manager, Station station) {
        if (!stationRepository.existsById(station.getStationId()) ||
                !userRepository.existsById(manager.getUsername())) {
            return false;
        }
        return true;
    }

    public boolean changeUserData(String username, Map<String, String> user) {
        Users newUser =  userRepository.findById(username).orElseThrow(() -> new IllegalStateException("Wrong username"));
        newUser.setName(user.get("name"));
        newUser.setSurname(user.get("surname"));
        newUser.setPassword(user.get("password"));
        newUser.setEmail(user.get("email"));
        if (user.get("photo") != null) {
            newUser.setPhoto(user.get("photo"));
        }
        userRepository.save(newUser);
        return true;
    }
}