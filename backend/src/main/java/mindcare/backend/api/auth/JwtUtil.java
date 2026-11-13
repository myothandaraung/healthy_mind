package mindcare.backend.api.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

public final class JwtUtil {

  private static final String SECRET = "mindcare-dev-secret-do-not-use-in-production-change-me";
  private static final long TTL_MS = 1000L * 60 * 60 * 24 * 7; // 7 days

  private JwtUtil() {}

  public static String issue(UUID userId, String email, String name) {
    Date now = new Date();
    return Jwts.builder()
      .setSubject(userId.toString())
      .claim("email", email)
      .claim("name", name)
      .setIssuedAt(now)
      .setExpiration(new Date(now.getTime() + TTL_MS))
      .signWith(Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS256)
      .compact();
  }
}
