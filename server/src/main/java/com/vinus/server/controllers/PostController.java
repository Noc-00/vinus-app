package com.vinus.server.controllers;

import com.vinus.server.entities.Post;
import com.vinus.server.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @GetMapping
    public List<Post> obtenerTodos() {
        return postRepository.findAll();
    }

    @PostMapping
    public Post crear(@RequestBody Post post) {
        return postRepository.save(post);
    }
}