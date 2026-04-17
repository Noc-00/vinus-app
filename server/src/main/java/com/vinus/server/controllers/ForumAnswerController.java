package com.vinus.server.controllers;

import com.vinus.server.entities.ForumAnswer;
import com.vinus.server.repositories.ForumAnswerRepository;
import com.vinus.server.repositories.ForumQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forum-answers")
@CrossOrigin(origins = "http://localhost:5173")
public class ForumAnswerController {

    @Autowired
    private ForumAnswerRepository forumAnswerRepository;

    @Autowired
    private ForumQuestionRepository forumQuestionRepository;

    @GetMapping("/question/{questionId}")
    public List<ForumAnswer> getAnswersByQuestion(@PathVariable Long questionId) {
        return forumAnswerRepository.findByQuestionId(questionId);
    }

    @PostMapping("/question/{questionId}")
    public ResponseEntity<?> crearRespuesta(@PathVariable Long questionId, @RequestBody ForumAnswer answer) {
        return forumQuestionRepository.findById(questionId).map(pregunta -> {
            answer.setQuestion(pregunta);
            return ResponseEntity.ok(forumAnswerRepository.save(answer));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/upvote")
    public ResponseEntity<?> upvoteAnswer(@PathVariable Long id) {
        return forumAnswerRepository.findById(id).map(answer -> {
            int currentUpvotes = (answer.getUpvotes() == null) ? 0 : answer.getUpvotes();
            answer.setUpvotes(currentUpvotes + 1);
            forumAnswerRepository.save(answer);
            return ResponseEntity.ok(answer);
        }).orElse(ResponseEntity.notFound().build());
    }


}