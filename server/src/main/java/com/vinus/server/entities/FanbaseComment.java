package com.vinus.server.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "fanbase_comments")
public class FanbaseComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String post_id;
    private String author_name;
    private String author_email;
    @Column(columnDefinition = "TEXT")
    private String content;
}