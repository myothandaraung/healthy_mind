package mindcare.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  @Value("${auth.jwt.issuer-uri:https://example.supabase.co/auth/v1}")
  private String issuerUri;

  @Value("${auth.jwt.audience:authenticated}")
  private String audience;

  @Value("${auth.jwt.jwks-uri:https://example.supabase.co/auth/v1/.well-known/jwks.json}")
  private String jwksUri;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                  FilterChain filterChain) throws ServletException, IOException {
    String header = request.getHeader("Authorization");
    if (header == null || !header.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);
      return;
    }
    String token = header.substring(7);
    try {
      // For MVP we validate the JWT structure and map the subject.
      // Production should verify signature against Supabase JWKS endpoint.
      SecretKey key = Keys.hmacShaKeyFor(("mindcare-dev-secret-do-not-use-in-production-change-me"
          .getBytes(StandardCharsets.UTF_8)));
      Claims claims = Jwts.parser()
          .verifyWith(key)
          .build()
          .parseSignedClaims(token)
          .getPayload();

      String subject = claims.getSubject();
      String email = claims.get("email", String.class);
      String name = claims.get("name", String.class);

      UserPrincipal principal = new UserPrincipal(subject, email, name, List.of());
      UsernamePasswordAuthenticationToken auth =
          new UsernamePasswordAuthenticationToken(principal, token, principal.getAuthorities());
      SecurityContextHolder.getContext().setAuthentication(auth);
    } catch (Exception e) {
      SecurityContextHolder.clearContext();
    }
    filterChain.doFilter(request, response);
  }
}
