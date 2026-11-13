package mindcare.backend.api.dto;

import java.util.UUID;

public record ErrorResponse(
  String code,
  String message,
  String field
) {}
