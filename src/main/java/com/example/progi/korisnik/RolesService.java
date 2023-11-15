package com.example.progi.korisnik;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RolesService {
    private final RolesRepository rolesRepository;

    public RolesService(RolesRepository rolesRepository) {
        this.rolesRepository = rolesRepository;
    }

    public Roles getByName(String roleName){
        return rolesRepository.findByRoleName(roleName).orElseThrow(() -> new RuntimeException("Roles not found for name: " + roleName));
    }
}
