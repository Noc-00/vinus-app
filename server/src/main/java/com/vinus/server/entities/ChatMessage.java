package com.vinus.server.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "chat_messages")
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String room_id;
    @Column(columnDefinition = "TEXT")
    private String content;
    private String sender_name;
    private String sender_email;
    private String sender_avatar;
}