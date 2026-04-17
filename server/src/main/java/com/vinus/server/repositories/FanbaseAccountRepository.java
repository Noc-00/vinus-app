package com.vinus.server.repositories;

import com.vinus.server.entities.FanbaseAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FanbaseAccountRepository extends JpaRepository<FanbaseAccount, Long> {
}