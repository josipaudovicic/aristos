package com.example.backend.korisnik.comment;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.animal.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserCommentRepository extends JpaRepository<UserComment, Long> {
    List<UserComment> findByAnimal(Animal animal);
}
