package uidt.dev.fullstackcrudbook.service;

import uidt.dev.fullstackcrudbook.model.Livre;

import java.util.List;

public interface LivreServiceInterface {
    List<Livre> getAllLivres();
    Livre getLivreById(Long id);
    Livre creerLivre(Livre livre);
    Livre modifierLivre(Long id, Livre livre);
    void supprimerLivre(Long id);
}

