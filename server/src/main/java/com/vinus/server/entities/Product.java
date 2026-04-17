package com.vinus.server.entities;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Data
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String type;
    private String exchange_for;

    private Double price;
    private String category;

    @Column(columnDefinition = "TEXT")
    private String image_url;

    private String status;

    @JsonProperty("seller_name")
    private String seller_name;

    @JsonProperty("seller_email")
    private String seller_email;

    @JsonProperty("seller_avatar")
    private String seller_avatar;
}