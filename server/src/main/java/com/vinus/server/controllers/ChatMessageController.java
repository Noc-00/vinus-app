package com.vinus.server.controllers;

import com.vinus.server.entities.ChatMessage;
import com.vinus.server.repositories.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/chat-messages")
@CrossOrigin(origins = "*")
public class ChatMessageController {
    @Autowired
    private ChatMessageRepository repository;

    @GetMapping
    public List<ChatMessage> obtenerTodos() { return repository.findAll(); }

    @PostMapping
    public ChatMessage crear(@RequestBody ChatMessage message) { return repository.save(message); }
}