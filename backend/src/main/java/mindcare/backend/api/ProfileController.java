package mindcare.backend.api;

import mindcare.backend.api.dto.ProfileResponse;
import mindcare.backend.api.dto.ProfileUpdateRequest;
import mindcare.backend.api.dto.PreferenceResponse;
import mindcare.backend.api.dto.PreferenceUpdateRequest;
import mindcare.backend.domain.user.UserProfile;
import mindcare.backend.domain.user.UserPreference;
import mindcare.backend.domain.user.UserProfileRepository;
import mindcare.backend.domain.user.UserPreferenceRepository;
import mindcare.backend.config.UserPrincipal;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/me")
public class ProfileController {

  private final UserProfileRepository profileRepository;
  private final UserPreferenceRepository preferenceRepository;

  public ProfileController(UserProfileRepository profileRepository,
                           UserPreferenceRepository preferenceRepository) {
    this.profileRepository = profileRepository;
    this.preferenceRepository = preferenceRepository;
  }

  @GetMapping
  public ProfileResponse getProfile(@AuthenticationPrincipal UserPrincipal principal) {
    UUID userId = principal.getId();
    UserProfile profile = profileRepository.findById(userId)
      .orElseThrow(() -> new IllegalArgumentException("Profile not found"));
    return map(profile);
  }

  @PatchMapping
  @Transactional
  public ProfileResponse updateProfile(@AuthenticationPrincipal UserPrincipal principal,
                                       @RequestBody ProfileUpdateRequest request) {
    UUID userId = principal.getId();
    UserProfile profile = profileRepository.findById(userId)
      .orElseGet(() -> {
        UserProfile p = new UserProfile();
        p.setUserId(userId);
        return p;
      });
    if (request.displayName() != null) profile.setDisplayName(request.displayName());
    if (request.locale() != null) profile.setLocale(request.locale());
    if (request.timezone() != null) profile.setTimezone(request.timezone());
    profile.setUpdatedAt(java.time.Instant.now());
    profileRepository.save(profile);
    return map(profile);
  }

  @GetMapping("/preferences")
  public PreferenceResponse getPreferences(@AuthenticationPrincipal UserPrincipal principal) {
    UUID userId = principal.getId();
    UserPreference pref = preferenceRepository.findById(userId)
      .orElseGet(() -> {
        UserPreference p = new UserPreference();
        p.setUserId(userId);
        return p;
      });
    return map(pref);
  }

  @PatchMapping("/preferences")
  @Transactional
  public PreferenceResponse updatePreferences(@AuthenticationPrincipal UserPrincipal principal,
                                              @RequestBody PreferenceUpdateRequest request) {
    UUID userId = principal.getId();
    UserPreference pref = preferenceRepository.findById(userId)
      .orElseGet(() -> {
        UserPreference p = new UserPreference();
        p.setUserId(userId);
        return p;
      });
    if (request.remindersEnabled() != null) pref.setRemindersEnabled(request.remindersEnabled());
    if (request.notificationTime() != null) pref.setNotificationTime(request.notificationTime());
    if (request.hideStreaks() != null) pref.setHideStreaks(request.hideStreaks());
    pref.setUpdatedAt(java.time.Instant.now());
    preferenceRepository.save(pref);
    return map(pref);
  }

  private static ProfileResponse map(UserProfile p) {
    return new ProfileResponse(p.getUserId(), p.getDisplayName(), p.getLocale(), p.getTimezone());
  }

  private static PreferenceResponse map(UserPreference p) {
    return new PreferenceResponse(p.getUserId(), p.getRemindersEnabled(), p.getNotificationTime(), p.getHideStreaks());
  }
}
