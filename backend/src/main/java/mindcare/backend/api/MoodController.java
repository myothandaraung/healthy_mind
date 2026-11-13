package mindcare.backend.api;

import mindcare.backend.api.dto.MoodEntryRequest;
import mindcare.backend.api.dto.MoodEntryResponse;
import mindcare.backend.api.dto.MoodSummaryResponse;
import mindcare.backend.domain.mood.MoodEntry;
import mindcare.backend.domain.mood.MoodEntryRepository;
import mindcare.backend.config.UserPrincipal;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/moods")
public class MoodController {

  private final MoodEntryRepository moodRepository;

  public MoodController(MoodEntryRepository moodRepository) {
    this.moodRepository = moodRepository;
  }

  @PostMapping
  @Transactional
  public MoodEntryResponse create(@AuthenticationPrincipal UserPrincipal principal,
                                  @Valid @RequestBody MoodEntryRequest request) {
    if (request.moodLevel() == null || request.moodLevel() < 1 || request.moodLevel() > 5) {
      throw new IllegalArgumentException("moodLevel must be between 1 and 5");
    }
    if (request.occurredAt() == null) {
      throw new IllegalArgumentException("occurredAt is required");
    }
    MoodEntry entry = new MoodEntry();
    entry.setId(java.util.UUID.randomUUID());
    entry.setUserId(principal.getId());
    entry.setMoodLevel(request.moodLevel());
    entry.setEmotionTags(request.emotionTags() != null ? request.emotionTags() : List.of());
    entry.setNote(request.note());
    entry.setOccurredAt(request.occurredAt());
    entry.setCreatedAt(Instant.now());
    entry.setUpdatedAt(Instant.now());
    MoodEntry saved = moodRepository.save(entry);
    return map(saved);
  }

  @GetMapping
  public List<MoodEntryResponse> list(@AuthenticationPrincipal UserPrincipal principal,
                                      @RequestParam(required = false) Instant from,
                                      @RequestParam(required = false) Instant to,
                                      @RequestParam(required = false) Integer page,
                                      @RequestParam(required = false) Integer size) {
    int p = page != null ? page : 0;
    int s = size != null ? Math.min(size, 100) : 50;
    PageRequest pageable = PageRequest.of(p, s);
    List<MoodEntry> entries;
    if (from != null && to != null) {
      entries = moodRepository.findByUserIdAndOccurredAtBetweenOrderByOccurredAtDesc(
        principal.getId(), from, to, pageable);
    } else if (from != null) {
      entries = moodRepository.findByUserIdAndOccurredAtGreaterThanEqualOrderByOccurredAtDesc(
        principal.getId(), from, pageable);
    } else if (to != null) {
      entries = moodRepository.findByUserIdAndOccurredAtLessThanEqualOrderByOccurredAtDesc(
        principal.getId(), to, pageable);
    } else {
      entries = moodRepository.findByUserIdOrderByOccurredAtDesc(principal.getId(), pageable);
    }
    return entries.stream().map(MoodController::map).collect(Collectors.toList());
  }

  @GetMapping("/summary")
  public MoodSummaryResponse summary(@AuthenticationPrincipal UserPrincipal principal,
                                     @RequestParam(defaultValue = "week") String period) {
    List<MoodEntry> entries = moodRepository.findByUserIdOrderByOccurredAtDesc(
      principal.getId(), PageRequest.of(0, 200));
    return new MoodSummaryResponse(period, entries.stream().map(MoodController::map).collect(Collectors.toList()));
  }

  @PatchMapping("/{id}")
  @Transactional
  public ResponseEntity<MoodEntryResponse> update(@AuthenticationPrincipal UserPrincipal principal,
                                    @PathVariable String id,
                                    @Valid @RequestBody MoodEntryRequest request) {
    if (principal == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    if (request.moodLevel() == null || request.moodLevel() < 1 || request.moodLevel() > 5) {
      throw new IllegalArgumentException("moodLevel must be between 1 and 5");
    }
    MoodEntry entry = moodRepository.findById(UUID.fromString(id))
      .orElseThrow(() -> new IllegalArgumentException("Mood entry not found"));
    if (!entry.getUserId().equals(principal.getId())) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    entry.setMoodLevel(request.moodLevel());
    entry.setEmotionTags(request.emotionTags() != null ? request.emotionTags() : List.of());
    entry.setNote(request.note());
    if (request.occurredAt() != null) entry.setOccurredAt(request.occurredAt());
    entry.setUpdatedAt(Instant.now());
    return ResponseEntity.ok(map(moodRepository.save(entry)));
  }

  @DeleteMapping("/{id}")
  @Transactional
  public ResponseEntity<Void> delete(@AuthenticationPrincipal UserPrincipal principal,
                                     @PathVariable String id) {
    if (principal == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    MoodEntry entry = moodRepository.findById(UUID.fromString(id))
      .orElseThrow(() -> new IllegalArgumentException("Mood entry not found"));
    if (!entry.getUserId().equals(principal.getId())) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    moodRepository.deleteByIdAndUserId(UUID.fromString(id), principal.getId());
    return ResponseEntity.noContent().build();
  }

  private static MoodEntryResponse map(MoodEntry e) {
    return new MoodEntryResponse(
      e.getId(), e.getUserId(), e.getMoodLevel(), e.getEmotionTags(),
      e.getNote(), e.getOccurredAt(), e.getCreatedAt(), e.getUpdatedAt()
    );
  }
}
