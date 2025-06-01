import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "./ui/dialog";
import Book from '../assets/book.png';
import BookReader from '../assets/bookreader.svg';

import { toast } from "sonner";
import { z } from "zod";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog";
import '../CSS/Book.css';
import api from '../services/api';

const bookSchema = z.object({
  titre: z.string().min(1, "Title is required"),
  auteur: z.string().min(1, "Author is required"),
  anneePublication: z.string().refine(val => /^\d{4}$/.test(val), "Year must be a 4-digit number"),
  genre: z.string().optional(),
  description: z.string().optional()
});

export default function BookAdmin() {
  const navigate = useNavigate();
  const [livres, setLivres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [bookForm, setBookForm] = useState({ titre: '', auteur: '', anneePublication: '', genre: '', description: '' });
  const [formError, setFormError] = useState('');
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const [viewBook, setViewBook] = useState(null); // <-- Ajout état pour la vue
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedAuteur, setSelectedAuteur] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Nombre de livres par page

  // Récupérer la liste unique des genres et auteurs pour les options
  const genres = Array.from(new Set(livres.map(livre => livre.genre).filter(Boolean)));
  const auteurs = Array.from(new Set(livres.map(livre => livre.auteur).filter(Boolean)));

  const handleCreateLivre = async () => {
    console.log('handleCreateLivre', bookForm);
    const result = bookSchema.safeParse({
      titre: bookForm.titre,
      auteur: bookForm.auteur,
      anneePublication: bookForm.anneePublication
    });
    console.log('create validation result', result);
    if (!result.success) {
      setFormError(result.error.errors[0].message);
      return;
    }
    const payload = {
      titre: bookForm.titre,
      auteur: bookForm.auteur,
      anneePublication: parseInt(bookForm.anneePublication),
      genre: bookForm.genre ,
      description: bookForm.description 
    };
    console.log('createLivre payload', payload);
    await api.post('/create', payload);
    toast.success("Book added successfully");
    setBookForm({ titre: '', auteur: '', anneePublication: '', genre: '', description: '' });
    setEditingBook(null);
    setFormError('');
    setShowDialog(false);
    loadLivres();
  };

  // Ajout d'une fonction dédiée pour la modification
  const handleUpdateLivre = async () => {
    console.log('handleUpdateLivre', bookForm, editingBook);
    const result = bookSchema.safeParse({
      titre: bookForm.titre,
      auteur: bookForm.auteur,
      anneePublication: bookForm.anneePublication,
      genre: bookForm.genre,
      description: bookForm.description
    });
    console.log('update validation result', result);
    if (!result.success) {
      setFormError(result.error.errors[0].message);
      return;
    }
    const payload = {
      titre: bookForm.titre,
      auteur: bookForm.auteur,
      anneePublication: parseInt(bookForm.anneePublication),
      genre: bookForm.genre,
      description: bookForm.description
    };
    console.log('updateLivre payload', payload, 'id:', editingBook?.id);
    const response = await api.put(`/update/${editingBook.id}`, payload);
    console.log('updateLivre response', response);
    toast.success("Book updated successfully");
    setBookForm({ titre: '', auteur: '', anneePublication: '', genre: '', description: '' });
    setEditingBook(null);
    setFormError('');
    setShowDialog(false);
    loadLivres();
  };

  const openEditDialog = (livre) => {
    setBookForm({ titre: livre.titre, auteur: livre.auteur, anneePublication: livre.anneePublication.toString(), genre: livre.genre || '', description: livre.description || '' });
    setEditingBook(livre);
    setShowDialog(true);
  };

  const handleDelete = async () => {
    await api.delete(`/delete/${selectedToDelete.id}`);
    toast.success(selectedToDelete.titre +" deleted successfully");
    setSelectedToDelete(null);
    loadLivres();
  };

  const loadLivres = async () => {
    try {
      const response = await api.get('/allbooks');
      console.log('fetchLivres response', response);
      setLivres(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to fetch books. Please try again later.');
    }
  };

  useEffect(() => {
    loadLivres();
  }, []);

  // Appliquer les filtres
  const filteredLivres = livres.filter(livre =>
    livre.titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedGenre === '' || livre.genre === selectedGenre) &&
    (selectedAuteur === '' || livre.auteur === selectedAuteur)
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLivres = filteredLivres.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLivres.length / itemsPerPage);

  return (
    <>
    {/* Flèche retour */}
        <button
          className="bookadmin-back"
          onClick={() => navigate('/')}
          title="Retour à l'accueil"
          style={{
            position: 'absolute',
            top: '2rem',
            left: '1rem',
            border: '1px solid #A8443D',
            borderRadius: '50%',
            margin:'0',
            cursor: 'pointer',
            marginRight: '2rem',
            padding: 0
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#A8443D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

    <div className="bookadmin-bg">
            <header className="bookadmin-header">

        <div className="bookadmin-header-title">
          <span><img src={Book} alt="Book Icon" width={80} /></span>
          <h1>MaBiblio.</h1>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <button className="btn-add-book" onClick={() => {
              setEditingBook(null);
              setBookForm({ titre: '', auteur: '', anneePublication: '', genre: '', description: '' });
              setFormError('');
              setShowDialog(true);
              
            }}>
              + Nouveau Livre
            </button>
          </DialogTrigger>
          <DialogContent className="bookadmin-dialog-content">
            <DialogTitle asChild>
              <h2>{editingBook ? 'Modifier Livre' : 'Ajouter Nouveau Livre'}</h2>
            </DialogTitle>
            <input 
              placeholder="Titre" 
              value={bookForm.titre} 
              onChange={(e) => setBookForm({ ...bookForm, titre: e.target.value })} 
            />

            <input 
              placeholder="Auteur" 
              value={bookForm.auteur} 
              onChange={(e) => setBookForm({ ...bookForm, auteur: e.target.value })} 
            />

            <input 
              placeholder="Annee Publication" 
              type="number" 
              value={bookForm.anneePublication} 
              onChange={(e) => setBookForm({ ...bookForm, anneePublication: e.target.value })} 

            />
            <input
              placeholder="Genre "
              value={bookForm.genre}
              onChange={(e) => setBookForm({ ...bookForm, genre: e.target.value })}
            />
            <textarea
              placeholder="Description " 
              value={bookForm.description}
              onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
              style={{ height: '60px', borderRadius: '8px', padding: '0.5rem', fontSize: '1rem' }}
            />
            {formError && <div className="dialog-error">{formError}</div>}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="btn-save" style={{ background: '#b0b0b0', color: '#fff' }} onClick={() => setShowDialog(false)} type="button">Cancel</button>
              {editingBook ? (
                <button className="btn-save" onClick={handleUpdateLivre}>Modifier ✎</button>
              ) : (
                <button className="btn-save" onClick={handleCreateLivre}>Ajouter ✚</button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="bookadmin-searchbar" style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
        <input
          placeholder="🔍︎ Rechercher un livre ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="bookadmin-select"
          value={selectedGenre}
          onChange={e => setSelectedGenre(e.target.value)}
          style={{ minWidth: 180 }}
        >
          <option value="">Tous les genres</option>
          {genres.map((genre, idx) => (
            <option key={idx} value={genre}>{genre}</option>
          ))}
        </select>
        <select
          className="bookadmin-select"
          value={selectedAuteur}
          onChange={e => setSelectedAuteur(e.target.value)}
          style={{ minWidth: 180 }}
        >
          <option value="">Tous les auteurs</option>
          {auteurs.map((auteur, idx) => (
            <option key={idx} value={auteur}>{auteur}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="bookadmin-error">
          {error}
        </div>
      )}

      {filteredLivres.length === 0 ? (
        <div className="bookadmin-empty">
          No books found.
        </div>
      ) : (
        <>
          {/* Boîte de dialogue pour voir les détails */}
          <Dialog open={!!viewBook} onOpenChange={() => setViewBook(null)}>
            <DialogContent className="bookadmin-dialog-content bookadmin-dialog-details">
              <DialogTitle asChild>
                <h2>Détails du livre</h2>
              </DialogTitle>
              {viewBook && (
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '2rem',
                  padding: '1rem'
                }}>
                  <div style={{ minWidth: 100 }}>
                    <img src={BookReader} alt="Livre" width={100} style={{borderRadius: '12px', boxShadow: '0 2px 8px #eaf3ff'}} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{marginBottom: '0.7rem'}}><b>Titre :</b> {viewBook.titre}</div>
                    <div style={{marginBottom: '0.7rem'}}><b>Auteur :</b> {viewBook.auteur}</div>
                    <div style={{marginBottom: '0.7rem'}}><b>Année :</b> {viewBook.anneePublication}</div>
                    <div style={{marginBottom: '0.7rem'}}><b>Genre :</b> {viewBook.genre || <span style={{color:'#aaa'}}>Non renseigné</span>}</div>
                    <div style={{marginBottom: '0.7rem'}}><b>Description :</b> {viewBook.description || <span style={{color:'#aaa'}}>Non renseignée</span>}</div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <table className="bookadmin-table" style={{width: '100%', maxWidth: '1200px'}}>
            <thead>
              <tr>
                {/* <th>Id</th> */}
                <th>Title</th>
                <th>Auteur</th>
                <th>Année Publication</th>
                <th className="text-right">Actions Suplementaires</th>
              </tr>
            </thead>
            <tbody>
              {currentLivres.map((livre) => (
                <tr key={livre.id}>
                  {/* <td>{livre.id}</td> */}
                  <td>{livre.titre}</td>
                  <td>{livre.auteur}</td>
                  <td>{livre.anneePublication}</td>
                  <td>
                    <div className="bookadmin-actions">
                      {/* Bouton œil pour voir les détails */}
                      <button className="btn-view" onClick={() => setViewBook(livre)} title="Voir détails" style={{marginRight: '0.5rem'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2d7be5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                      <button className="btn-edit" onClick={() => openEditDialog(livre)} title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A8443D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                      </button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="btn-delete" onClick={() => setSelectedToDelete(livre)} title="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M8 6v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bookadmin-dialog-content bookadmin-dialog-alert">
                          <AlertDialogHeader>
                            <h2 style={{fontSize: '1.4rem', fontWeight: 'bold', color: '#A8443D', marginBottom: '1rem', textAlign: 'center'}}>Suppression du livre</h2>
                            <div style={{fontSize: '1.1rem', color: '#222', marginBottom: '1.5rem', textAlign: 'center'}}>
                              Êtes-vous sûr de vouloir supprimer ce livre&nbsp;?
                              <br/>
                              <span style={{display:'inline-block', margin:'0.7rem 0', fontWeight:'bold', color:'#A8443D', fontSize:'1.15rem'}}>
                                {selectedToDelete?.titre ? `« ${selectedToDelete.titre} »` : ''}
                              </span><br/>
                              Cette action est <span style={{color:'#e11d48', fontWeight:'bold'}}>irréversible</span>.
                            </div>
                          </AlertDialogHeader>
                          <AlertDialogFooter style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem' }}>
                            <AlertDialogCancel style={{ minWidth: '120px', background: '#b0b0b0', color: '#fff', borderRadius: '0.7rem', fontWeight: 'bold', fontSize: '1.1rem', height: '2.8rem', border: 'none', cursor: 'pointer' }}>Annuler</AlertDialogCancel>
                            <AlertDialogAction style={{ minWidth: '120px', background: '#e11d48', color: '#fff', borderRadius: '0.7rem', fontWeight: 'bold', fontSize: '1.1rem', height: '2.8rem', border: 'none', cursor: 'pointer' }} onClick={handleDelete}>Oui, supprimer</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0 1rem 0', gap: '0.5rem' }}>
            <button
              className="bookadmin-pagination-btn"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Précédent
            </button>
            <span style={{ padding: '0 1rem', fontWeight: 'bold' }}>
              Page {currentPage} / {Math.ceil(filteredLivres.length / itemsPerPage)}
            </span>
            <button
              className="bookadmin-pagination-btn"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredLivres.length / itemsPerPage)))}
              disabled={currentPage === Math.ceil(filteredLivres.length / itemsPerPage) || filteredLivres.length === 0}
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
    </>
  );
}
