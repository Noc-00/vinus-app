package com.vinus.server.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String image_url;
    private String author_name;
    private String author_avatar;
    private String author_institution;

    private Integer likes_count = 0;
    private Integer comments_count = 0;
}