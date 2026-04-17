package com.vinus.server.repositories;

import com.vinus.server.entities.ForumQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ForumQuestionRepository extends JpaRepository<ForumQuestion, Long> {

    @Query("SELECT q FROM ForumQuestion q WHERE q.author_name = :authorName")
    List<ForumQuestion> findByAuthorName(@Param("authorName") String authorName);

}