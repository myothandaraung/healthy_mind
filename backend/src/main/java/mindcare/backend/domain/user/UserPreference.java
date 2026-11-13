package mindcare.backend.domain.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "user_preferences")
public class UserPreference {

  @Id
  @Column(name = "user_id", columnDefinition = "uuid")
  private UUID userId;

  @Column(name = "reminders_enabled", nullable = false)
  private Boolean remindersEnabled = false;

  @Column(name = "notification_time", length = 8)
  private String notificationTime;

  @Column(name = "hide_streaks", nullable = false)
  private Boolean hideStreaks = false;

  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt = Instant.now();

  public UUID getUserId() {
    return userId;
  }

  public void setUserId(UUID userId) {
    this.userId = userId;
  }

  public Boolean getRemindersEnabled() {
    return remindersEnabled;
  }

  public void setRemindersEnabled(Boolean remindersEnabled) {
    this.remindersEnabled = remindersEnabled;
  }

  public String getNotificationTime() {
    return notificationTime;
  }

  public void setNotificationTime(String notificationTime) {
    this.notificationTime = notificationTime;
  }

  public Boolean getHideStreaks() {
    return hideStreaks;
  }

  public void setHideStreaks(Boolean hideStreaks) {
    this.hideStreaks = hideStreaks;
  }

  public Instant getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(Instant updatedAt) {
    this.updatedAt = updatedAt;
  }
}
