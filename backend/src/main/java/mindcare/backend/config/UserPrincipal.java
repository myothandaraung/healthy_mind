package mindcare.backend.config;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public class UserPrincipal implements UserDetails {

  private final UUID id;
  private final String email;
  private final String name;
  private final Collection<? extends GrantedAuthority> authorities;

  public UserPrincipal(String id, String email, String name,
                       Collection<? extends GrantedAuthority> authorities) {
    this.id = UUID.fromString(id);
    this.email = email;
    this.name = name;
    this.authorities = authorities;
  }

  public UUID getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  public String getName() {
    return name;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return null;
  }

  @Override
  public String getUsername() {
    return email != null ? email : id.toString();
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public static List<SimpleGrantedAuthority> NO_AUTHORITIES = List.of();
}
