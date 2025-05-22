package uidt.dev.fullstackcrudbook.controller;

import org.springframework.web.bind.annotation.*;
import uidt.dev.fullstackcrudbook.model.Livre;
import uidt.dev.fullstackcrudbook.service.LivreServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api-book")
public class LivreController {

    private final LivreServiceImpl livreService;

    // Injection par constructeur (recommandé)
    public LivreController(LivreServiceImpl livreService) {
        this.livreService = livreService;
    }

    @GetMapping("/allbook")
    public List<Livre> getallLivres() {
        return livreService.getAllLivres();
    }

    @GetMapping("/{id}")
    public Livre getLivreById(@PathVariable Long id) {
        return livreService.getLivreById(id);
    }

    @PostMapping("/create")
    public Livre createLivre(@RequestBody Livre newLivre) {
        return livreService.creerLivre(newLivre);
    }

    @PutMapping("/update/{id}")
    public Livre updateLivre(@PathVariable Long id, @RequestBody Livre updateLivre) {
        return livreService.modifierLivre(id, updateLivre);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteLivre(@PathVariable Long id) {
        livreService.SupprimerLivre(id);
    }
}