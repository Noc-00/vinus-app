package com.vinus.server.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "convocatorias")
public class Convocatoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;

    private String image_url;
    private String category;
    private String country;
    private String state;
    private String author_name;
    private String author_email;
    private String deadline;
    private String link;
}