package com.example.progi.korisnik;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

public interface AdminService {
    List<Users> listAll();
    Users getUserById(String id);
    public List<Users> getUsersToConfirm();
    boolean confirm(Users user);
    boolean delete(Users user);

}