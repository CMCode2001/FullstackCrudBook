package uidt.dev.fullstackcrudbook.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomComplet;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Provider provider; // GOOGLE, LOCAL

    @Enumerated(EnumType.STRING)
    private Role role; // USER, ADMIN

    // Constructeurs
    public Users(String nomComplet, String email, String password, Provider provider, Role role) {
        this.nomComplet = nomComplet;
        this.email = email;
        this.password = password;
        this.provider = provider;
        this.role = role;
    }

    public Users() {
        this.role = Role.USER; // Valeur par défaut
    }

    // Getters/Setters (Lombok @Data les génère automatiquement)
}