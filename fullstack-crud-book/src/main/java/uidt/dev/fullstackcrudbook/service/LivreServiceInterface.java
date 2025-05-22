package uidt.dev.fullstackcrudbook.service;

import uidt.dev.fullstackcrudbook.model.Livre;

import java.util.List;

public interface LivreServiceInterface {
    List<Livre> getAllLivres();
    Livre getLivreById(Long id);
    Livre createLivre(Livre livre);
    Livre updateLivre(Long id, Livre livre);
    void deleteLivre(Long id);
}

