package com.vinus.server.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "follows")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String follower_email;
    private String account_id;
    private String account_username;
}