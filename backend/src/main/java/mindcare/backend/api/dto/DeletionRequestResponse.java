package mindcare.backend.api.dto;

import java.util.UUID;

public record DeletionRequestResponse(
  UUID id,
  String status
) {}
