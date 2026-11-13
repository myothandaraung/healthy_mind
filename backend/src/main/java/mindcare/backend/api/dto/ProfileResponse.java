package mindcare.backend.api.dto;

import java.util.UUID;

public record ProfileResponse(
  UUID userId,
  String displayName,
  String locale,
  String timezone
) {}
