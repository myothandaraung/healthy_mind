package mindcare.backend.api.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record JournalEntryRequest(
  String title,
  String body,
  List<String> tags
) {}
