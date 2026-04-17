package com.vinus.server.controllers;

import com.vinus.server.entities.ChatRoom;
import com.vinus.server.repositories.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/chat-rooms")
@CrossOrigin(origins = "*")
public class ChatRoomController {
    @Autowired
    private ChatRoomRepository repository;

    @GetMapping
    public List<ChatRoom> obtenerTodas() { return repository.findAll(); }

    @PostMapping
    public ChatRoom crear(@RequestBody ChatRoom room) { return repository.save(room); }
}