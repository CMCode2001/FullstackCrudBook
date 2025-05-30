package uidt.dev.fullstackcrudbook.dto;

public class RegisterRequest {
    private String nomComplet;
    private String email;
    private String password;

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getNomComplet() {
        return nomComplet;
    }
    public void setNomComplet(String nomComplet) {
        this.nomComplet = nomComplet;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

}
