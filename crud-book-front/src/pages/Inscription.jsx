import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../CSS/Inscription.css'
import signSVG from '../assets/sign-up-animate.svg'
import api from '../services/api';
import { toast } from 'sonner';

export default function Inscription() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomComplet: '',
    email: '',
    password: ''
  });

  const handleInscription = async (e) => {
    e.preventDefault();
    try{
      const response =  await api.post('/auth/inscription', formData);
      console.log('Inscription reussie',response.data);
      toast.success('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      navigate('/connexion');
    } catch (error) {
      console.error('Erreur lors de l\'inscription', error);  
    }
  }


  return (
    <div className="inscription-container">
      {/* Flèche retour */}
      <button
        className="inscription-back"
        onClick={() => navigate('/')}
        title="Retour à l'accueil"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A8443D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>

      <div className="inscription-left">
        <img src={signSVG} alt="Inscription visuelle" className="inscription-svg" />
      </div>

      <div className="inscription-right">
        <form className="inscription-form" onSubmit={handleInscription}>
          <h2>Inscription</h2>
          <input
            type="text"
            placeholder="Nom complet"
            onChange={(e) => setFormData({ ...formData, nomComplet: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          
          <button type="submit" className="btn-inscription">Inscription</button>
          <div className="inscription-sep">ou</div>

          <button type="button" className="btn-google">
            <svg width="22" height="22" viewBox="0 0 48 48" style={{verticalAlign:'middle',marginRight:8}}><g><path fill="#4285F4" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.1-5.4 7-9.8 7-5.8 0-10.5-4.7-10.5-10.5S19.2 14 25 14c2.4 0 4.6.8 6.3 2.2l6.2-6.2C34.7 7.2 30.1 5 25 5 14.5 5 6 13.5 6 24s8.5 19 19 19c9.5 0 18-7.5 18-17.5 0-1.2-.1-2.1-.4-3z"/><path fill="#34A853" d="M7.5 14.1l6.6 4.8C16.2 16.1 20.3 14 25 14c2.4 0 4.6.8 6.3 2.2l6.2-6.2C34.7 7.2 30.1 5 25 5c-7.1 0-13.1 4.1-16.1 10.1z"/><path fill="#FBBC05" d="M25 43c5.1 0 9.7-1.7 13.3-4.7l-6.2-5.1c-1.7 1.2-3.9 2-6.3 2-4.4 0-8.2-2.9-9.8-7H7.5c2.9 6 9 10.5 17.5 10.5z"/><path fill="#EA4335" d="M43.6 20.5h-1.9V20H24v8h11.3c-.7 2-2.1 3.7-3.9 4.9l6.2 5.1c3.6-3.3 5.7-8.1 5.7-13.5 0-1.2-.1-2.1-.4-3z"/></g>
            </svg>
            Inscription avec Google
            
          </button>
          <p style={{textAlign:'center'}}>
            J'ai déjà un compte ! 
            <span style={{color:'#A8443D',cursor:'pointer'}} onClick={() => navigate ('/connexion' )}>
              <b> Se Connecter </b>
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}
