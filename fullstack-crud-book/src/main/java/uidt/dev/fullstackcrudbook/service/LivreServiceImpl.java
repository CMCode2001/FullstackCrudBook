package uidt.dev.fullstackcrudbook.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uidt.dev.fullstackcrudbook.model.Livre;
import uidt.dev.fullstackcrudbook.repository.LivreRepository;

import java.util.List;

@Service
public class LivreServiceImpl implements LivreServiceInterface {
    private final LivreRepository livreRepository;

    @Autowired
    public LivreServiceImpl(LivreRepository livreRepository) {
        this.livreRepository = livreRepository;
    }
    public List <Livre> getAllLivres() {
        return livreRepository.findAll();
    }
    public Livre getLivreById(Long id) {
        return livreRepository.findById(id).get();
    }

    public Livre creerLivre(Livre newLivre){
        if (!getAllLivres().contains(newLivre) ){
            return livreRepository.save(newLivre);
        }
        return null;
    }

    public Livre modifierLivre(Long id, Livre updateLivre){
        if (livreRepository.existsById(id)){
            Livre livreExistant = getLivreById(id);
            livreExistant.setTitre(updateLivre.getTitre());
            livreExistant.setAuteur(updateLivre.getAuteur());
            livreExistant.setAnneePublication(updateLivre.getAnneePublication());
            return livreRepository.save(livreExistant);
        }
        return null;
    }

    public void supprimerLivre(Long id){
        if (getAllLivres().contains(getLivreById(id))){
            livreRepository.deleteById(id);
        }
    }
}
