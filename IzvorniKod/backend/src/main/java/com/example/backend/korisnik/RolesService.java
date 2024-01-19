package com.example.backend.korisnik;

import org.springframework.stereotype.Service;

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
