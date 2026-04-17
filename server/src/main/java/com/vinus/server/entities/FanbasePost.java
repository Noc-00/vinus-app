package com.vinus.server.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "fanbase_posts")
public class FanbasePost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String account_id;
    private String account_username;
    private String account_avatar;
    private String account_display_name;
    @Column(columnDefinition = "TEXT")
    private String content;
    private String image_url;
    private String type;
    private String link;
    private Integer likes_count = 0;
    private Integer comments_count = 0;
}