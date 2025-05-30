import React from 'react'
import { useNavigate } from 'react-router-dom'
import biblioImg from '../assets/biblio.jpg'
import LogoBook from '../assets/bookSVG.svg'
import '../CSS/Acceuil.css'

export default function Acceuil() {
  const navigate = useNavigate();
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <div className="acceuil-bg" style={{ backgroundImage: `url(${biblioImg})` }}>
      {/* Overlay */}
      <div className="acceuil-overlay" />
      {/* Header */}
      <div className="acceuil-header">
        <img src={LogoBook} alt="LogoBook" width={70}/>
        <span className="acceuil-logo">
            MaBiblio.
        </span>
        
      </div>
      {/* Accroche avec effet typewriter */}
      <div className="acceuil-typewriter">
        <h1>
          <span className="typewriter-text">
            Bienvenue dans votre univers de lecture !
          </span>
        </h1>
        <div>
            <button onClick={() => navigate('/bibliotheque')} className="btn-bibliotheque">
                <span className="btn-text">Accéder à la bibliothèque</span>
            </button>  
        </div>
      </div>
      
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
        {/* Footer */}
        <div className="acceuil-footer">
            <p>© {currentYear} MaBiblio. | Design by CMC | All rights reserved</p>
        </div>
        </div>
  )
}
