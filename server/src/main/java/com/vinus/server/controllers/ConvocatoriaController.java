package com.vinus.server.controllers;

import com.vinus.server.entities.Convocatoria;
import com.vinus.server.repositories.ConvocatoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/convocatorias")
@CrossOrigin(origins = "*")
public class ConvocatoriaController {

    @Autowired
    private ConvocatoriaRepository convocatoriaRepository;

    @GetMapping
    public List<Convocatoria> obtenerTodas() {
        return convocatoriaRepository.findAll();
    }

    @PostMapping
    public Convocatoria crear(@RequestBody Convocatoria convocatoria) {
        return convocatoriaRepository.save(convocatoria);
    }
}