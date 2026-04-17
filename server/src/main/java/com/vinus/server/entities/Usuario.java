package com.vinus.server.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String email;
    private String password;
    private LocalDate fechaNacimiento;
    private String sexo;
    private String institucion;
    @Column(length = 500)
    private String sobreMi;
    private String intereses;
    @Column(columnDefinition = "TEXT")
    private String fotoPerfil;
}