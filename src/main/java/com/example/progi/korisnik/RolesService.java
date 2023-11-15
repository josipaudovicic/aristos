package com.example.progi.korisnik;

import org.springframework.stereotype.Service;

@Service
public class RolesService {
    private final RolesRepository rolesRepository;

    public RolesService(RolesRepository rolesRepository) {
        this.rolesRepository = rolesRepository;
    }

    public Roles getByName(String roleName){
        return rolesRepository.findByRolesName(roleName);
    }
}
