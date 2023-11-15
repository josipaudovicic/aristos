package com.example.progi.korisnik;

import org.apache.catalina.User;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminServiceJpa implements AdminService{

    @Autowired
    private UserRepository user_repository;

    @Override
    public List<Users> listAll() {
        return user_repository.findAll();
    }

    public Users getUserById(String username) {
        if (user_repository.existsById(username)) {
            return user_repository.getReferenceById(username);
        } else {
            return null;
        }
    }

    public List<Users> getUsersToConfirm() {
        List<Users> allUsers = this.listAll();
        List<Users> toConfirm = allUsers.stream().filter(user -> (user.getRole().getRoleName().equals("voditelj postaje")
                || user.getRole().getRoleName().equals("istrazivac")) && !user.isAdminCheck()).collect(Collectors.toList());

        return toConfirm;
    }

    @Override
     public boolean delete(Users user) {
        String username = user.getUsername();

        if (user_repository.existsById(username)) {
            user_repository.deleteById(username);
            return true;
        } else {
            return false;
        }
    }
}