package mindcare.backend.api.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record MoodEntryResponse(
  UUID id,
  UUID userId,
  Integer moodLevel,
  List<String> emotionTags,
  String note,
  Instant occurredAt,
  Instant createdAt,
  Instant updatedAt
) {}
