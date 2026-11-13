package mindcare.backend.api.dto;

import java.util.UUID;

public record PreferenceResponse(
  UUID userId,
  Boolean remindersEnabled,
  String notificationTime,
  Boolean hideStreaks
) {}
