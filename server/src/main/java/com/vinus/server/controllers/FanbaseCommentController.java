package com.vinus.server.controllers;

import com.vinus.server.entities.FanbaseComment;
import com.vinus.server.repositories.FanbaseCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/fanbase-comments")
@CrossOrigin(origins = "*")
public class FanbaseCommentController {

    @Autowired
    private FanbaseCommentRepository repository;

    @GetMapping
    public List<FanbaseComment> obtenerTodos() {
        return repository.findAll();
    }

    @PostMapping
    public FanbaseComment crear(@RequestBody FanbaseComment comment) {
        return repository.save(comment);
    }
}