package com.example.backend.korisnik.comment;

import com.example.backend.korisnik.animal.Animal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserCommentService {
    private final UserCommentRepository userCommentRepository;

    @Autowired
    public UserCommentService(UserCommentRepository userCommentRepository) {
        this.userCommentRepository = userCommentRepository;
    }

    public void save(UserComment userComment) {
        userCommentRepository.save(userComment);
    }

    public List<UserComment> findByAnimal(Animal animal) {
        return userCommentRepository.findByAnimal(animal);
    }
}
