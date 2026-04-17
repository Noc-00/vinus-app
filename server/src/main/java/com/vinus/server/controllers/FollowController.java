package com.vinus.server.controllers;

import com.vinus.server.entities.Follow;
import com.vinus.server.repositories.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/follows")
@CrossOrigin(origins = "*")
public class FollowController {
    @Autowired
    private FollowRepository repository;

    @GetMapping
    public List<Follow> obtenerTodos() { return repository.findAll(); }

    @PostMapping
    public Follow crear(@RequestBody Follow follow) { return repository.save(follow); }
}
