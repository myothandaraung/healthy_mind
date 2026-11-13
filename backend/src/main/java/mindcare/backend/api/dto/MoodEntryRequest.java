package mindcare.backend.api.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record MoodEntryRequest(
  Integer moodLevel,
  List<String> emotionTags,
  String note,
  Instant occurredAt
) {}
