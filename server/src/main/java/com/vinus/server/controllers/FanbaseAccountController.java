package com.vinus.server.controllers;

import com.vinus.server.entities.FanbaseAccount;
import com.vinus.server.repositories.FanbaseAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/fanbase-accounts")
@CrossOrigin(origins = "*")
public class FanbaseAccountController {
    @Autowired
    private FanbaseAccountRepository repository;

    @GetMapping
    public List<FanbaseAccount> obtenerTodas() { return repository.findAll(); }

    @PostMapping
    public FanbaseAccount crear(@RequestBody FanbaseAccount account) { return repository.save(account); }
}