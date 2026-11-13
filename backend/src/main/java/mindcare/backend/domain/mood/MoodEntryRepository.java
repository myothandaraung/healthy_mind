package mindcare.backend.domain.mood;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Repository
public interface MoodEntryRepository extends JpaRepository<MoodEntry, UUID> {

  List<MoodEntry> findByUserIdOrderByOccurredAtDesc(UUID userId, Pageable pageable);

  List<MoodEntry> findByUserIdAndOccurredAtGreaterThanEqualOrderByOccurredAtDesc(
    UUID userId, Instant from, Pageable pageable);

  List<MoodEntry> findByUserIdAndOccurredAtLessThanEqualOrderByOccurredAtDesc(
    UUID userId, Instant to, Pageable pageable);

  List<MoodEntry> findByUserIdAndOccurredAtBetweenOrderByOccurredAtDesc(
    UUID userId, Instant from, Instant to, Pageable pageable);

  boolean existsByIdAndUserId(UUID id, UUID userId);

  void deleteByIdAndUserId(UUID id, UUID userId);
}
