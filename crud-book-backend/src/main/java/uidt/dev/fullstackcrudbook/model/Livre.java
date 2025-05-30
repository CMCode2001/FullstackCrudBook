package uidt.dev.fullstackcrudbook.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Livre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titre;
    private String auteur;
    private String description;
    private String genre;

    @Column(name = "annee_publication")
    private int anneePublication;

    // ✅ Constructeur sans argument (obligatoire pour JPA)
    public Livre() {}

    // ✅ Constructeur avec paramètres
    public Livre(String titre, String auteur, int anneePublication, String description, String genre) {
        this.titre = titre;
        this.auteur = auteur;
        this.anneePublication = anneePublication;
        this.description = description;
        this.genre = genre;
    }

    // ✅ Getters et setters
    public Long getId() {
        return id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getAuteur() {
        return auteur;
    }

    public void setAuteur(String auteur) {
        this.auteur = auteur;
    }

    public int getAnneePublication() {
        return anneePublication;
    }

    public void setAnneePublication(int anneePublication) {
        this.anneePublication = anneePublication;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getGenre() {
        return genre;
    }
    public void setGenre(String genre) {
        this.genre = genre;
    }

}
