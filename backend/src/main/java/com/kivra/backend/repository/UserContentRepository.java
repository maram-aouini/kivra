package com.kivra.backend.repository;

import com.kivra.backend.entity.ContentStatus;
import com.kivra.backend.entity.ContentType;
import com.kivra.backend.entity.UserContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserContentRepository extends JpaRepository<UserContent, Long> {
    List<UserContent> findByUserId(Long userId);
    List<UserContent> findByUserIdAndType(Long userId, ContentType type);
    List<UserContent> findByUserIdAndStatus(Long userId, ContentStatus status);
    List<UserContent> findByUserIdAndTypeAndStatus(Long userId, ContentType type, ContentStatus status);
    Optional<UserContent> findByIdAndUserId(Long id, Long userId);
}