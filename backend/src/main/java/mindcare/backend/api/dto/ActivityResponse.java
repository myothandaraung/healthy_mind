package mindcare.backend.api.dto;

import java.time.Instant;
import java.util.UUID;

public record ActivityResponse(
  UUID id,
  String type,
  String titleKey,
  Integer durationSeconds,
  String instructions
) {}
