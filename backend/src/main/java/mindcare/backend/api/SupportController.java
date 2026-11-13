package mindcare.backend.api;

import mindcare.backend.api.dto.SupportResourceResponse;
import mindcare.backend.domain.support.SupportResource;
import mindcare.backend.domain.support.SupportResourceRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/support-resources")
public class SupportController {

  private final SupportResourceRepository supportResourceRepository;

  public SupportController(SupportResourceRepository supportResourceRepository) {
    this.supportResourceRepository = supportResourceRepository;
  }

  @GetMapping
  public List<SupportResourceResponse> list(@RequestParam String country,
                                            @RequestParam(required = false) String locale) {
    String loc = locale != null ? locale : "en";
    List<SupportResource> resources = supportResourceRepository.findByCountryCodeAndLocaleAndStatus(
      country.toUpperCase(), loc, "active");
    return resources.stream().map(SupportController::map).collect(Collectors.toList());
  }

  private static SupportResourceResponse map(SupportResource r) {
    return new SupportResourceResponse(
      r.getId(), r.getCountryCode(), r.getLocale(), r.getResourceType(),
      r.getName(), r.getContactUrl(), r.getPhone(), r.getVerifiedAt()
    );
  }
}
