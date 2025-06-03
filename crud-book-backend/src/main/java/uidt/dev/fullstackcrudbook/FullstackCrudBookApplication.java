package uidt.dev.fullstackcrudbook;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import uidt.dev.fullstackcrudbook.model.Livre;
import uidt.dev.fullstackcrudbook.repository.LivreRepository;

import java.util.Properties;

@SpringBootApplication
public class FullstackCrudBookApplication {

	public static void main(String[] args) {
		// Charger les variables d'environnement depuis le fichier .env
		Dotenv dotenv = Dotenv.load();

		// Injecter dans les propriétés système
		Properties props = new Properties();
		dotenv.entries().forEach(entry -> {
			props.put(entry.getKey(), entry.getValue());
		});
		props.forEach((key, value) -> System.setProperty((String) key, (String) value));

		// Démarrer l'application Spring
		SpringApplication.run(FullstackCrudBookApplication.class, args);
	}

	// Initialisation de la base avec des livres
	@Bean
	public CommandLineRunner initData(LivreRepository livreRepository) {
		return args -> {
			livreRepository.save(new Livre(
					"Le Petit Prince",
					"Antoine de Saint-Exupéry",
					1943,
					"Un conte poétique et philosophique sur l’enfance, l’amitié et le sens de la vie.",
					"Fiction"
			));

			livreRepository.save(new Livre(
					"Sous l'Orage",
					"Seydou BANDIA",
					1957,
					"Un roman réaliste sur les conflits générationnels dans une société africaine traditionnelle.",
					"Roman social"
			));

			livreRepository.save(new Livre(
					"Une si longue lettre",
					"Mariama BA",
					1979,
					"Un témoignage poignant d’une femme sénégalaise sur la condition féminine après la mort de son mari.",
					"Épistolaire, féminisme"
			));

			livreRepository.save(new Livre(
					"L’Étranger",
					"Albert Camus",
					1942,
					"Un roman existentialiste qui questionne l’absurdité de la vie à travers un protagoniste détaché.",
					"Philosophique"
			));

			livreRepository.save(new Livre(
					"Les Misérables",
					"Victor Hugo",
					1862,
					"Une fresque sociale et historique sur la rédemption, la justice et l’injustice dans la France du XIXe siècle.",
					"Roman historique"
			));

			livreRepository.save(new Livre(
					"L’Enfant noir",
					"Camara Laye",
					1953,
					"Un récit autobiographique sur l’enfance en Afrique et le passage à la modernité.",
					"Autobiographie, roman initiatique"
			));
		};
	}
}
