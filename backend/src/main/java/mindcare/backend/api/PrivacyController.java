package mindcare.backend.api;

import mindcare.backend.api.dto.ExportRequestResponse;
import mindcare.backend.api.dto.DeletionRequestResponse;
import mindcare.backend.domain.privacy.DataExportRequest;
import mindcare.backend.domain.privacy.AccountDeletionRequest;
import mindcare.backend.domain.privacy.DataExportRequestRepository;
import mindcare.backend.domain.privacy.AccountDeletionRequestRepository;
import mindcare.backend.config.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.UUID;

@RestController
@RequestMapping("/me")
public class PrivacyController {

  private final DataExportRequestRepository exportRepository;
  private final AccountDeletionRequestRepository deletionRepository;

  public PrivacyController(DataExportRequestRepository exportRepository,
                           AccountDeletionRequestRepository deletionRepository) {
    this.exportRepository = exportRepository;
    this.deletionRepository = deletionRepository;
  }

  @PostMapping("/data-exports")
  @Transactional
  public ExportRequestResponse requestExport(@AuthenticationPrincipal UserPrincipal principal) {
    DataExportRequest req = new DataExportRequest();
    req.setId(UUID.randomUUID());
    req.setUserId(principal.getId());
    req.setStatus("requested");
    req.setCreatedAt(Instant.now());
    req.setExpiresAt(Instant.now().plusSeconds(86400));
    DataExportRequest saved = exportRepository.save(req);
    return new ExportRequestResponse(saved.getId(), saved.getStatus());
  }

  @DeleteMapping
  @Transactional
  public DeletionRequestResponse requestDeletion(@AuthenticationPrincipal UserPrincipal principal) {
    AccountDeletionRequest req = new AccountDeletionRequest();
    req.setId(UUID.randomUUID());
    req.setUserId(principal.getId());
    req.setStatus("requested");
    req.setRequestedAt(Instant.now());
    AccountDeletionRequest saved = deletionRepository.save(req);
    return new DeletionRequestResponse(saved.getId(), saved.getStatus());
  }
}
