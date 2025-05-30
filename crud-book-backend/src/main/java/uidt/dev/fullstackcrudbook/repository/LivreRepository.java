package uidt.dev.fullstackcrudbook.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import uidt.dev.fullstackcrudbook.model.Livre;

public interface LivreRepository extends JpaRepository<Livre, Long> {
}
