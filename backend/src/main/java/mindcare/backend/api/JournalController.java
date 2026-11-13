package mindcare.backend.api;

import mindcare.backend.api.dto.JournalEntryRequest;
import mindcare.backend.api.dto.JournalEntryResponse;
import mindcare.backend.domain.journal.JournalEntry;
import mindcare.backend.domain.journal.JournalEntryRepository;
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
@RequestMapping("/journals")
public class JournalController {

  private final JournalEntryRepository journalRepository;

  public JournalController(JournalEntryRepository journalRepository) {
    this.journalRepository = journalRepository;
  }

  @PostMapping
  @Transactional
  public JournalEntryResponse create(@AuthenticationPrincipal UserPrincipal principal,
                                     @Valid @RequestBody JournalEntryRequest request) {
    if (request.body() == null || request.body().isBlank()) {
      throw new IllegalArgumentException("body is required");
    }
    JournalEntry entry = new JournalEntry();
    entry.setId(java.util.UUID.randomUUID());
    entry.setUserId(principal.getId());
    entry.setTitle(request.title());
    entry.setBody(request.body());
    entry.setTags(request.tags() != null ? request.tags() : List.of());
    entry.setCreatedAt(Instant.now());
    entry.setUpdatedAt(Instant.now());
    JournalEntry saved = journalRepository.save(entry);
    return map(saved);
  }

  @GetMapping
  public List<JournalEntryResponse> list(@AuthenticationPrincipal UserPrincipal principal,
                                         @RequestParam(required = false) Integer page,
                                         @RequestParam(required = false) Integer size) {
    int p = page != null ? page : 0;
    int s = size != null ? Math.min(size, 100) : 50;
    List<JournalEntry> entries = journalRepository.findByUserId(
      principal.getId(), PageRequest.of(p, s, Sort.by("createdAt").descending()));
    return entries.stream().map(JournalController::map).collect(Collectors.toList());
  }

  @GetMapping("/{id}")
  public ResponseEntity<JournalEntryResponse> get(@AuthenticationPrincipal UserPrincipal principal,
                                  @PathVariable String id) {
    if (principal == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    JournalEntry entry = journalRepository.findById(UUID.fromString(id))
      .orElseThrow(() -> new IllegalArgumentException("Journal entry not found"));
    if (!entry.getUserId().equals(principal.getId())) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    return ResponseEntity.ok(map(entry));
  }

  @PatchMapping("/{id}")
  @Transactional
  public ResponseEntity<JournalEntryResponse> update(@AuthenticationPrincipal UserPrincipal principal,
                                     @PathVariable String id,
                                     @Valid @RequestBody JournalEntryRequest request) {
    if (principal == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    JournalEntry entry = journalRepository.findById(UUID.fromString(id))
      .orElseThrow(() -> new IllegalArgumentException("Journal entry not found"));
    if (!entry.getUserId().equals(principal.getId())) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    if (request.title() != null) entry.setTitle(request.title());
    if (request.body() != null) entry.setBody(request.body());
    if (request.tags() != null) entry.setTags(request.tags());
    entry.setUpdatedAt(Instant.now());
    return ResponseEntity.ok(map(journalRepository.save(entry)));
  }

  @DeleteMapping("/{id}")
  @Transactional
  public ResponseEntity<Void> delete(@AuthenticationPrincipal UserPrincipal principal,
                                     @PathVariable String id) {
    if (principal == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    JournalEntry entry = journalRepository.findById(UUID.fromString(id))
      .orElseThrow(() -> new IllegalArgumentException("Journal entry not found"));
    if (!entry.getUserId().equals(principal.getId())) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    journalRepository.deleteByIdAndUserId(UUID.fromString(id), principal.getId());
    return ResponseEntity.noContent().build();
  }

  private static JournalEntryResponse map(JournalEntry e) {
    return new JournalEntryResponse(
      e.getId(), e.getUserId(), e.getTitle(), e.getBody(), e.getTags(),
      e.getCreatedAt(), e.getUpdatedAt()
    );
  }
}
