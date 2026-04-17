package com.vinus.server.controllers;

import com.vinus.server.entities.Usuario;
import com.vinus.server.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    @PostMapping
    public Usuario crear(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> actualizarPerfil(@RequestBody Usuario updatedUser) {
        return usuarioRepository.findByEmail(updatedUser.getEmail())
                .map(usuarioExistente -> {
                    if (updatedUser.getInstitucion() != null) usuarioExistente.setInstitucion(updatedUser.getInstitucion());
                    if (updatedUser.getSobreMi() != null) usuarioExistente.setSobreMi(updatedUser.getSobreMi());
                    if (updatedUser.getIntereses() != null) usuarioExistente.setIntereses(updatedUser.getIntereses());
                    if (updatedUser.getFotoPerfil() != null) usuarioExistente.setFotoPerfil(updatedUser.getFotoPerfil());

                    usuarioRepository.save(usuarioExistente);
                    return ResponseEntity.ok(usuarioExistente);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}