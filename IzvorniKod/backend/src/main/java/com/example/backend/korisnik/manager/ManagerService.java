package com.example.backend.korisnik.manager;

import com.example.backend.korisnik.HelpingTables.BelongsToStationRepository;
import com.example.backend.korisnik.UserRepository;
import com.example.backend.korisnik.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class ManagerService {
    private final UserRepository userRepository;
    private final BelongsToStationRepository belongsToStationRepository;

    @Autowired
    public ManagerService(UserRepository userRepository, BelongsToStationRepository belongsToStationRepository) {
        this.userRepository = userRepository;
        this.belongsToStationRepository = belongsToStationRepository;
    }

    public List<Map<String,String>> getTrackers() {
        List<Users> allUsers = userRepository.findAll();
        List<Users> listOfTrackers = allUsers.stream().filter(user -> (user.getRole().getRoleName().equals("Tragač")
                && !belongsToStationRepository.existsByUserName(user.getUsername()))).toList();

        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (Users user : listOfTrackers){
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

    public List<Map<String, String>> getMyTrackers(String managerUsername) {
        List<Users> allUsers = userRepository.findAll();
        List<Users> listOfMyTrackers = allUsers.stream().filter(user-> (user.getRole().getRoleName().equals("Tragač") &&
                Objects.equals(belongsToStationRepository.getStationIdByUserName(managerUsername), belongsToStationRepository.getStationIdByUserName(user.getUsername())))).toList();

        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (Users user : listOfMyTrackers){
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
}
