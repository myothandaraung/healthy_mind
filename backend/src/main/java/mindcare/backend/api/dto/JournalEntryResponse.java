package mindcare.backend.api.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record JournalEntryResponse(
  UUID id,
  UUID userId,
  String title,
  String body,
  List<String> tags,
  Instant createdAt,
  Instant updatedAt
) {}
