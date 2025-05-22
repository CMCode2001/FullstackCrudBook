package uidt.dev.fullstackcrudbook;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import uidt.dev.fullstackcrudbook.model.Livre;
import uidt.dev.fullstackcrudbook.repository.LivreRepository;

@SpringBootApplication
public class FullstackCrudBookApplication {

	public static void main(String[] args) {
		SpringApplication.run(FullstackCrudBookApplication.class, args);
	}

	@Bean
	public CommandLineRunner initData(LivreRepository livreRepository) {
		return args -> {
			livreRepository.save(new Livre("Le Petit Prince", "Antoine de Saint-Exupéry", 1943));
			livreRepository.save(new Livre("Sous l'Orage", "Seydou BANDIA", 1957));
			livreRepository.save(new Livre("Une si longue lettre", "Mariama BA", 1979));
			livreRepository.save(new Livre("L’Étranger", "Albert Camus", 1942));
			livreRepository.save(new Livre("Les Misérables", "Victor Hugo", 1862));
			livreRepository.save(new Livre("L’Enfant noir", "Camara Laye", 1953));
		};
	}
}
