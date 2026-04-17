package com.vinus.server.controllers;

import com.vinus.server.entities.Usuario;
import com.vinus.server.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginRequest) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(loginRequest.getEmail());

        if (usuario.isPresent() && usuario.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok(usuario.get());
        }
        return ResponseEntity.status(401).body("Correo o contraseña incorrectos");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestParam(required = false) String email) {
        if (email == null) return ResponseEntity.status(401).build();
        return usuarioRepository.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            return ResponseEntity.status(400).body("El correo ya está registrado");
        }
        return ResponseEntity.ok(usuarioRepository.save(usuario));
    }
}