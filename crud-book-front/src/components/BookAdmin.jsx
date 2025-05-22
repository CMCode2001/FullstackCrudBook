import { useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "./ui/dialog";
import Book from '../assets/book.png';
import { fetchLivres, createLivre, deleteLivre, updateLivre } from '../services/LivreServices';
import { toast } from "sonner";
import { z } from "zod";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog";
import './Book.css';

const bookSchema = z.object({
  titre: z.string().min(1, "Title is required"),
  auteur: z.string().min(1, "Author is required"),
  anneePublication: z.string().refine(val => /^\d{4}$/.test(val), "Year must be a 4-digit number")
});

export default function BookAdmin() {
  const [livres, setLivres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [bookForm, setBookForm] = useState({ titre: '', auteur: '', anneePublication: '' });
  const [formError, setFormError] = useState('');
  const [selectedToDelete, setSelectedToDelete] = useState(null);

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
      anneePublication: parseInt(bookForm.anneePublication)
    };
    console.log('createLivre payload', payload);
    await createLivre(payload);
    toast.success("Book added successfully");
    setBookForm({ titre: '', auteur: '', anneePublication: '' });
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
      anneePublication: bookForm.anneePublication
    });
    console.log('update validation result', result);
    if (!result.success) {
      setFormError(result.error.errors[0].message);
      return;
    }
    const payload = {
      titre: bookForm.titre,
      auteur: bookForm.auteur,
      anneePublication: parseInt(bookForm.anneePublication)
    };
    console.log('updateLivre payload', payload, 'id:', editingBook?.id);
    const response = await updateLivre(editingBook.id, payload);
    console.log('updateLivre response', response);
    toast.success("Book updated successfully");
    setBookForm({ titre: '', auteur: '', anneePublication: '' });
    setEditingBook(null);
    setFormError('');
    setShowDialog(false);
    loadLivres();
  };

  const openEditDialog = (livre) => {
    setBookForm({ titre: livre.titre, auteur: livre.auteur, anneePublication: livre.anneePublication.toString() });
    setEditingBook(livre);
    setShowDialog(true);
  };

  const handleDelete = async () => {
    await deleteLivre(selectedToDelete.id);
    toast.success("Book deleted successfully");
    setSelectedToDelete(null);
    loadLivres();
  };

  const loadLivres = async () => {
    try {
      const response = await fetchLivres();
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

  const filteredLivres = livres.filter(livre =>
    livre.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bookadmin-bg">
      <header className="bookadmin-header">
        <div className="bookadmin-header-title">
          <span><img src={Book} alt="Book Icon" width={80} /></span>
          <h1>Book Admin</h1>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <button className="btn-add-book" onClick={() => {
              setEditingBook(null);
              setBookForm({ titre: '', auteur: '', anneePublication: '' });
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
            <input placeholder="Titre" value={bookForm.titre} onChange={(e) => setBookForm({ ...bookForm, titre: e.target.value })} />
            <input placeholder="Auteur" value={bookForm.auteur} onChange={(e) => setBookForm({ ...bookForm, auteur: e.target.value })} />
            <input placeholder="Annee Publication" type="number" value={bookForm.anneePublication} onChange={(e) => setBookForm({ ...bookForm, anneePublication: e.target.value })} />
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

      <div className="bookadmin-searchbar">
        <input
          placeholder="🔍︎ Rechercher un livre ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
        <table className="bookadmin-table" style={{width: '100%', maxWidth: '1200px'}}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Auteur</th>
              <th>Année Publication</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLivres.map((livre) => (
              <tr key={livre.id}>
                <td>{livre.id}</td>
                <td>{livre.titre}</td>
                <td>{livre.auteur}</td>
                <td>{livre.anneePublication}</td>
                <td>
                  <div className="bookadmin-actions">
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
      )}
    </div>
  );
}
