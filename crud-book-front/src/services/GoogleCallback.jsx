import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../services/api';
import axios from 'axios';

export default function GoogleCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token')?.trim();
    const email = searchParams.get('email')?.trim();
    const name = searchParams.get('name')?.trim();

    console.log('Received token:', token);
    console.log('Received email:', email);
    console.log('Received name:', name);

    if (!token || !email) {
      console.error('Missing token or email in callback');
      toast.error('Authentification incomplète');
      navigate('/connexion');
      return;
    }

    // Stocker les informations
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    if (name) localStorage.setItem('name', name);

    // Configurer Axios pour les requêtes suivantes
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Vérifier l'authentification
    const verifyAuth = async () => {
      try {
        console.log('Verifying authentication with token:', token);
        
        const response = await api.get('/users/current', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('User verification response:', response.data);
        
        toast.success(`Bienvenue ${name || email} !`);
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Authentication verification failed:', error);
        console.error('Error details:', error.response?.data);
        
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        
        toast.error('Échec de la connexion. Veuillez réessayer.');
        navigate('/connexion', { replace: true });
      }
    };

    verifyAuth();
  }, [navigate, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
      <p className="text-gray-600">Authentification en cours...</p>
    </div>
  );
}