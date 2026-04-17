package com.vinus.server.controllers;

import com.vinus.server.entities.FanbasePost;
import com.vinus.server.repositories.FanbasePostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/fanbase-posts")
@CrossOrigin(origins = "*")
public class FanbasePostController {
    @Autowired
    private FanbasePostRepository repository;

    @GetMapping
    public List<FanbasePost> obtenerTodos() { return repository.findAll(); }

    @PostMapping
    public FanbasePost crear(@RequestBody FanbasePost post) { return repository.save(post); }
}