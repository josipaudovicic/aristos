package com.example.progi.korisnik;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void addUser(Users user) {
        boolean exists = userRepository.existsById(user.getUsername());
        if (exists) {
            throw new IllegalStateException("Korisnik with username " + user.getUsername() + " exists!");
        }
        userRepository.save(user);
    }

    public List<Users> getUsers() {
        return userRepository.findAll();
    }
}
