package com.vinus.server.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "forum_answers")
public class ForumAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    @JsonIgnore
    private ForumQuestion question;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String author_name;
    private String author_avatar;

    private Integer upvotes = 0;
    private Integer downvotes = 0;
    private Boolean is_best_answer = false;

    private java.time.LocalDateTime created_at = java.time.LocalDateTime.now();
}