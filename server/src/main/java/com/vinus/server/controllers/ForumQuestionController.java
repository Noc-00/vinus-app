package com.vinus.server.controllers;

import com.vinus.server.entities.ForumQuestion;
import com.vinus.server.repositories.ForumQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forum-questions")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS
})
public class ForumQuestionController {

    @Autowired
    private ForumQuestionRepository forumQuestionRepository;

    @GetMapping
    public List<ForumQuestion> getAllQuestions() {
        return forumQuestionRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ForumQuestion> getQuestionById(@PathVariable Long id) {
        return forumQuestionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ForumQuestion createQuestion(@RequestBody ForumQuestion question) {
        if (question.getSame_problem_count() == null) {
            question.setSame_problem_count(0);
        }
        return forumQuestionRepository.save(question);
    }

    @PatchMapping("/{id}/same-problem")
    public ResponseEntity<?> incrementSameProblem(@PathVariable Long id) {
        return forumQuestionRepository.findById(id).map(question -> {
            int currentCount = (question.getSame_problem_count() == null) ? 0 : question.getSame_problem_count();
            question.setSame_problem_count(currentCount + 1);
            forumQuestionRepository.save(question);
            return ResponseEntity.ok(question);
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/my-questions")
    public List<ForumQuestion> getMyQuestions(@RequestParam String author) {
        return forumQuestionRepository.findByAuthorName(author);
    }

@DeleteMapping("/{id}")
@Transactional
public ResponseEntity<?> deleteQuestion(@PathVariable Long id, @RequestParam String authorName) {
    return forumQuestionRepository.findById(id).map(question -> {
        if (question.getAuthor_name().equals(authorName)) {
            forumQuestionRepository.delete(question);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(403).body("No autorizado");
        }
    }).orElse(ResponseEntity.notFound().build());
}
}