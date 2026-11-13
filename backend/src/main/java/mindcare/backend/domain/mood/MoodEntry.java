package mindcare.backend.domain.mood;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import mindcare.backend.domain.common.StringListConverter;

@Entity
@Table(name = "mood_entries")
public class MoodEntry {

  @Id
  @Column(name = "id", columnDefinition = "uuid")
  private UUID id;

  @Column(name = "user_id", columnDefinition = "uuid", nullable = false)
  private UUID userId;

  @Column(name = "mood_level", nullable = false)
  private Integer moodLevel;

  @Convert(converter = StringListConverter.class)
  @Column(name = "emotion_tags", length = 1000)
  private List<String> emotionTags;

  @Column(name = "note", length = 2000)
  private String note;

  @Column(name = "occurred_at", nullable = false)
  private Instant occurredAt;

  @Column(name = "created_at", nullable = false)
  private Instant createdAt = Instant.now();

  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt = Instant.now();

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public UUID getUserId() {
    return userId;
  }

  public void setUserId(UUID userId) {
    this.userId = userId;
  }

  public Integer getMoodLevel() {
    return moodLevel;
  }

  public void setMoodLevel(Integer moodLevel) {
    this.moodLevel = moodLevel;
  }

  public List<String> getEmotionTags() {
    return emotionTags;
  }

  public void setEmotionTags(List<String> emotionTags) {
    this.emotionTags = emotionTags;
  }

  public String getNote() {
    return note;
  }

  public void setNote(String note) {
    this.note = note;
  }

  public Instant getOccurredAt() {
    return occurredAt;
  }

  public void setOccurredAt(Instant occurredAt) {
    this.occurredAt = occurredAt;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Instant createdAt) {
    this.createdAt = createdAt;
  }

  public Instant getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(Instant updatedAt) {
    this.updatedAt = updatedAt;
  }
}
