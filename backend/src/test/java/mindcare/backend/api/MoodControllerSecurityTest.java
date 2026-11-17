package mindcare.backend.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import mindcare.backend.api.auth.JwtUtil;
import mindcare.backend.api.dto.MoodEntryRequest;
import mindcare.backend.domain.mood.MoodEntry;
import mindcare.backend.domain.mood.MoodEntryRepository;
import mindcare.backend.domain.user.UserPreference;
import mindcare.backend.domain.user.UserProfile;
import mindcare.backend.domain.user.UserProfileRepository;
import mindcare.backend.domain.user.UserPreferenceRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class MoodControllerSecurityTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private MoodEntryRepository moodRepository;

  @Autowired
  private UserProfileRepository profileRepository;

  @Autowired
  private UserPreferenceRepository preferenceRepository;

  @Autowired
  private JwtUtil jwtUtil;

  private String tokenFor(UUID userId, String email) {
    return jwtUtil.issue(userId, email, null);
  }

  private UserPreference pref(UUID userId) {
    UserPreference p = new UserPreference();
    p.setUserId(userId);
    p.setRemindersEnabled(false);
    p.setHideStreaks(false);
    p.setUpdatedAt(Instant.now());
    return p;
  }

  @Test
  void userCannotAccessAnotherUsersMoodEntry() throws Exception {
    UUID userA = UUID.randomUUID();
    UUID userB = UUID.randomUUID();

    UserProfile pa = new UserProfile();
    pa.setUserId(userA);
    pa.setLocale("en");
    pa.setTimezone("UTC");
    profileRepository.save(pa);
    preferenceRepository.save(pref(userA));

    UserProfile pb = new UserProfile();
    pb.setUserId(userB);
    pb.setLocale("en");
    pb.setTimezone("UTC");
    profileRepository.save(pb);
    preferenceRepository.save(pref(userB));

    MoodEntry entry = new MoodEntry();
    entry.setId(UUID.randomUUID());
    entry.setUserId(userA);
    entry.setMoodLevel(3);
    entry.setEmotionTags(java.util.List.of());
    entry.setOccurredAt(Instant.now());
    entry.setCreatedAt(Instant.now());
    entry.setUpdatedAt(Instant.now());
    moodRepository.save(entry);

    String tokenB = tokenFor(userB, "b@example.com");
    String tokenA = tokenFor(userA, "a@example.com");

    // User B tries to delete user A's mood entry -> 403
    mockMvc.perform(delete("/moods/" + entry.getId())
            .header("Authorization", "Bearer " + tokenB))
        .andExpect(status().isForbidden());

    // User A can delete their own entry -> 204
    mockMvc.perform(delete("/moods/" + entry.getId())
            .header("Authorization", "Bearer " + tokenA))
        .andExpect(status().isNoContent());
  }

  @Test
  void healthEndpointWorks() throws Exception {
    String token = tokenFor(UUID.randomUUID(), "h@example.com");
    mockMvc.perform(get("/health")
            .header("Authorization", "Bearer " + token))
        .andExpect(status().isOk());
  }

  @Test
  void createMoodRequiresAuthentication() throws Exception {
    MoodEntryRequest req = new MoodEntryRequest(3, null, null, Instant.now());
    mockMvc.perform(post("/moods")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(req)))
        .andExpect(status().isForbidden());
  }
}
