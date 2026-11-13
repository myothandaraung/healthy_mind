package mindcare.backend.api.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record MoodSummaryResponse(
  String period,
  List<MoodEntryResponse> entries
) {}
