package com.example.backend.korisnik;

import java.util.List;

public interface AdminService {
    List<Users> listAll();
    Users getUserById(String id);
    public List<Users> getUsersToConfirm();
    boolean confirm(Users user);
    boolean delete(Users user);

}