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

    @Override
    public Livre createLivre(Livre livre) {
        return null;
    }

    @Override
    public Livre updateLivre(Long id, Livre livre) {
        return null;
    }

    @Override
    public void deleteLivre(Long id) {

    }

    public Livre creerLivre(Livre newLivre){
        if (!getAllLivres().contains(newLivre) ){
            return livreRepository.save(newLivre);
        }
        return null;
    }

    public Livre modifierLivre(Long id, Livre livreExistant){
        if (getAllLivres().contains(livreExistant)){
            Livre updateLivre = getLivreById(id);
            updateLivre.setTitre(livreExistant.getTitre());
            updateLivre.setAuteur(livreExistant.getAuteur());
            updateLivre.setAnneePublication(livreExistant.getAnneePublication());
            return livreRepository.save(updateLivre);
        }
        return null;
    }

    public void SupprimerLivre(Long id){
        if (getAllLivres().contains(getLivreById(id))){
            livreRepository.deleteById(id);
        }
    }
}
