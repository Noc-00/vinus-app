package com.vinus.server.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "fanbase_accounts")
public class FanbaseAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String display_name;
    @Column(columnDefinition = "TEXT")
    private String bio;
    private String avatar_url;
    private String cover_url;
    private String city;
    private Integer followers_count = 0;
    private Integer posts_count = 0;
    private String owner_email;
    private Boolean is_verified = false;
}