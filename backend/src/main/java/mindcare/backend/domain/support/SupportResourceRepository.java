package mindcare.backend.domain.support;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface SupportResourceRepository extends JpaRepository<SupportResource, UUID> {

  List<SupportResource> findByCountryCodeAndLocaleAndStatus(String countryCode, String locale, String status);
}
