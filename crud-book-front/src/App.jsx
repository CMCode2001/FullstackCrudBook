import { Toaster } from 'sonner'
import './App.css'
import Inscription from './pages/Inscription'
import Connexion from './pages/Connexion'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Acceuil from './pages/Acceuil'
import Bibliotheque from './pages/Bibliotheque'

function App() {

  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/bibliotheque" element={<Bibliotheque />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
        </Routes>
      
      </Router>
      <Toaster position='top-center'/>
    </div>
  )
}

export default App
