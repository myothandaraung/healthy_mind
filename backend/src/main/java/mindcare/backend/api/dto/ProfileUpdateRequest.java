package mindcare.backend.api.dto;

import java.util.UUID;

public record ProfileUpdateRequest(
  String displayName,
  String locale,
  String timezone
) {}
