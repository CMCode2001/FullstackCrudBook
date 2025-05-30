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

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<Livre> listLivres;

    public Users(String nomComplet, String email, String password) {
        this.nomComplet = nomComplet;
        this.email = email;
        this.password = password;
    }

    public Users() {}

    public Long getId() {
        return id;
    }

    public String getNomComplet() {
        return nomComplet;
    }
    public void setNomComplet(String nomComplet) {
        this.nomComplet = nomComplet;
    }
    
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
