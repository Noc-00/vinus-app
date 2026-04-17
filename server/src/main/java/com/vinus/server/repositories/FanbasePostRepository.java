package com.vinus.server.repositories;

import com.vinus.server.entities.FanbasePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FanbasePostRepository extends JpaRepository<FanbasePost, Long> {
}