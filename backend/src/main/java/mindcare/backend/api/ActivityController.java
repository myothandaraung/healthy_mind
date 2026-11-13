package mindcare.backend.api;

import mindcare.backend.api.dto.ActivityResponse;
import mindcare.backend.domain.activity.Activity;
import mindcare.backend.domain.activity.ActivityRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/activities")
public class ActivityController {

  private final ActivityRepository activityRepository;

  public ActivityController(ActivityRepository activityRepository) {
    this.activityRepository = activityRepository;
  }

  @GetMapping
  public List<ActivityResponse> list() {
    return activityRepository.findByIsPublishedTrue().stream().map(ActivityController::map).collect(Collectors.toList());
  }

  private static ActivityResponse map(Activity a) {
    return new ActivityResponse(a.getId(), a.getType(), a.getTitleKey(), a.getDurationSeconds(), a.getInstructions());
  }
}
