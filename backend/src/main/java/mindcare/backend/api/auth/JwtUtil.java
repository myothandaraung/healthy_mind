package mindcare.backend.api.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

@Component
public final class JwtUtil {

  private static final long TTL_MS = 1000L * 60 * 60 * 24 * 7; // 7 days
  private final SecretKey secretKey;

  public JwtUtil(@Value("${auth.jwt.secret}") String secret) {
    if (secret == null || secret.getBytes(StandardCharsets.UTF_8).length < 32) {
      throw new IllegalStateException("JWT_SECRET must be at least 32 bytes");
    }
    this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
  }

  public String issue(UUID userId, String email, String name) {
    Date now = new Date();
    return Jwts.builder()
      .setSubject(userId.toString())
      .claim("email", email)
      .claim("name", name)
      .setIssuedAt(now)
      .setExpiration(new Date(now.getTime() + TTL_MS))
      .signWith(secretKey, SignatureAlgorithm.HS256)
      .compact();
  }

  public Claims parse(String token) {
    return Jwts.parser()
      .verifyWith(secretKey)
      .build()
      .parseSignedClaims(token)
      .getPayload();
  }
}
