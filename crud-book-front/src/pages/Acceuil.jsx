import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import biblioImg from '../assets/biblio.jpg';
import LogoBook from '../assets/bookSVG.svg';
import '../CSS/Acceuil.css';
import api from '../services/api';
import bookreader from '../assets/bookreader.svg';

export default function Acceuil() {
  const navigate = useNavigate();
  const date = new Date();
  const currentYear = date.getFullYear();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchCurrentUser();
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get('/users/current');
      setUser(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur", error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  return (
    <div className="acceuil-bg" style={{ backgroundImage: `url(${biblioImg})` }}>
      {/* Overlay */}
      <div className="acceuil-overlay" />
      
      {/* Header */}
      <div className="acceuil-header">
        <img src={LogoBook} alt="LogoBook" width={70}/>
        <span className="acceuil-logo">MaBiblio.</span>
        
        {/* Section authentification */}
        <div className="auth-section">
          {isLoggedIn ? (
            <div className="user-menu" onClick={() => setShowDropdown(!showDropdown)}>
              <img
                src={bookreader}
                alt="User Avatar"
              />
              <button className="user-greeting">
                Bonjour, {user?.nomComplet || 'Utilisateur'} &nbsp;▼
              </button>
              
              {showDropdown && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout} className="logout-btn">
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="acceuil-btns">
              <button
                className="acceuil-btn connexion"
                onClick={() => navigate('/connexion')}
              >
                Connexion
              </button>
              <button
                className="acceuil-btn inscription"
                onClick={() => navigate('/inscription')}
              >
                Inscription
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Accroche avec effet typewriter */}
      <div className="acceuil-typewriter">
        <h1>
          <span className="typewriter-text">
            Bienvenue dans votre univers de lecture !
          </span>
        </h1>
        <div>
          <button onClick={() => {
            if (isLoggedIn) {
              navigate('/bibliotheque');
            }else{
              navigate('/inscription');
            }
          }} className="btn-bibliotheque">
            <span className="btn-text">Accéder à la bibliothèque</span>
          </button>  
        </div>
      </div>
      
      {/* Footer */}
      <div className="acceuil-footer">
        <p>© {currentYear} MaBiblio. | Design by CMC | All rights reserved</p>
      </div>
    </div>
  );
}