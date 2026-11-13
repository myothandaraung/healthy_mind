package mindcare.backend.api.auth;

import mindcare.backend.config.UserPrincipal;
import mindcare.backend.domain.user.UserProfile;
import mindcare.backend.domain.user.UserProfileRepository;
import mindcare.backend.domain.user.UserPreference;
import mindcare.backend.domain.user.UserPreferenceRepository;
import mindcare.backend.domain.user.UserCredential;
import mindcare.backend.domain.user.UserCredentialRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final UserProfileRepository profileRepository;
  private final UserPreferenceRepository preferenceRepository;
  private final UserCredentialRepository credentialRepository;
  private final PasswordEncoder passwordEncoder;

  public AuthController(UserProfileRepository profileRepository,
                        UserPreferenceRepository preferenceRepository,
                        UserCredentialRepository credentialRepository,
                        PasswordEncoder passwordEncoder) {
    this.profileRepository = profileRepository;
    this.preferenceRepository = preferenceRepository;
    this.credentialRepository = credentialRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public record RegisterRequest(String email, String password, String displayName, String locale, String timezone) {}
  public record LoginRequest(String email, String password) {}
  public record ForgotPasswordRequest(String email) {}
  public record AuthResponse(String accessToken, UserInfo user) {}
  public record UserInfo(String id, String email, String name) {}

  @PostMapping("/register")
  @Transactional
  public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest req) {
    String email = normalizeEmail(req.email);
    validatePassword(req.password);
    if (credentialRepository.existsByEmailIgnoreCase(email)) {
      throw new org.springframework.web.server.ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
    }
    UUID userId = UUID.randomUUID();
    UserProfile profile = new UserProfile();
    profile.setUserId(userId);
    profile.setDisplayName(req.displayName);
    profile.setLocale(req.locale != null ? req.locale : "en");
    profile.setTimezone(req.timezone != null ? req.timezone : "UTC");
    profileRepository.save(profile);

    UserPreference pref = new UserPreference();
    pref.setUserId(userId);
    preferenceRepository.save(pref);

    UserCredential credential = new UserCredential();
    credential.setUserId(userId);
    credential.setEmail(email);
    credential.setPasswordHash(passwordEncoder.encode(req.password));
    credentialRepository.save(credential);

    String token = JwtUtil.issue(userId, email, req.displayName);
    return ResponseEntity.ok(new AuthResponse(token, new UserInfo(userId.toString(), email, req.displayName)));
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
    String email = normalizeEmail(req.email);
    UserCredential credential = credentialRepository.findByEmailIgnoreCase(email)
      .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));
    if (req.password == null || !passwordEncoder.matches(req.password, credential.getPasswordHash())) {
      throw new org.springframework.web.server.ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
    }
    UUID userId = credential.getUserId();
    UserProfile profile = profileRepository.findById(userId).orElse(null);
    String displayName = profile != null ? profile.getDisplayName() : null;
    String token = JwtUtil.issue(userId, credential.getEmail(), displayName);
    return ResponseEntity.ok(new AuthResponse(token, new UserInfo(userId.toString(), credential.getEmail(), displayName)));
  }

  @PostMapping("/forgot-password")
  public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody ForgotPasswordRequest req) {
    Map<String, String> body = new HashMap<>();
    body.put("message", "If an account exists, recovery instructions were sent.");
    return ResponseEntity.ok(body);
  }

  @PostMapping("/logout")
  public ResponseEntity<Map<String, String>> logout(@AuthenticationPrincipal UserPrincipal principal) {
    Map<String, String> body = new HashMap<>();
    body.put("message", "Signed out.");
    return ResponseEntity.ok(body);
  }

  private static String normalizeEmail(String email) {
    if (email == null || email.isBlank() || !email.contains("@")) {
      throw new IllegalArgumentException("A valid email is required");
    }
    return email.trim().toLowerCase(java.util.Locale.ROOT);
  }

  private static void validatePassword(String password) {
    if (password == null || password.length() < 8) {
      throw new IllegalArgumentException("Password must be at least 8 characters");
    }
  }
}
