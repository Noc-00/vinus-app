package com.vinus.server.repositories;

import com.vinus.server.entities.ForumAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ForumAnswerRepository extends JpaRepository<ForumAnswer, Long> {
    List<ForumAnswer> findByQuestionId(Long questionId);
}