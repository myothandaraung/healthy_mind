package mindcare.backend.api.dto;

import java.util.UUID;

public record ExportRequestResponse(
  UUID id,
  String status
) {}
