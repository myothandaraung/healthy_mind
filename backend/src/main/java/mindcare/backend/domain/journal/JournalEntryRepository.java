package mindcare.backend.domain.journal;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface JournalEntryRepository extends JpaRepository<JournalEntry, UUID> {

  @Query("""
    SELECT j FROM JournalEntry j
    WHERE j.userId = :userId
    ORDER BY j.createdAt DESC
  """)
  List<JournalEntry> findByUserId(@Param("userId") UUID userId, Pageable pageable);

  boolean existsByIdAndUserId(UUID id, UUID userId);

  void deleteByIdAndUserId(UUID id, UUID userId);
}
