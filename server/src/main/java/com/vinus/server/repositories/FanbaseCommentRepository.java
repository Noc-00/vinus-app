package com.vinus.server.repositories;

import com.vinus.server.entities.FanbaseComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FanbaseCommentRepository extends JpaRepository<FanbaseComment, Long> {
}