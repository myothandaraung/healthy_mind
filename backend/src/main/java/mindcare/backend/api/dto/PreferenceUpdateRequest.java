package mindcare.backend.api.dto;

import java.util.UUID;

public record PreferenceUpdateRequest(
  Boolean remindersEnabled,
  String notificationTime,
  Boolean hideStreaks
) {}
