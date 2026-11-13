package mindcare.backend.api.dto;

import java.time.Instant;
import java.util.UUID;

public record SupportResourceResponse(
  UUID id,
  String countryCode,
  String locale,
  String resourceType,
  String name,
  String contactUrl,
  String phone,
  Instant verifiedAt
) {}
