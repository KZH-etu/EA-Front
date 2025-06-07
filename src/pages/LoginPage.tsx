import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import Logo from '../components/ui/Logo';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError('');
    
    try {
      // Mock credentials check
      if (data.email === 'admin@example.com' && data.password === 'admin123') {
        // Store mock auth state
        sessionStorage.setItem('isAuthenticated', 'true');
        // Use replace instead of push to prevent going back to login
        navigate('/admin', { replace: true });
      } else {
        setError('Email ou mot de passe incorrect.');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <motion.div 
        className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="p-6 bg-primary-500 text-white text-center">
          <Link to="/" className="inline-block">
            <Logo className="h-12 mx-auto" admin={true}/>
          </Link>
          <h1 className="text-2xl font-bold mt-4 text-white">Espace Administrateur</h1>
          <p className="mt-2 text-primary-100">Connectez-vous pour gérer le contenu du site</p>
        </div>
        
        {/* Login Form */}
        <div className="p-6 md:p-8">
          {error && (
            <div className="mb-6 p-4 bg-error/10 border-l-4 border-error text-error rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`form-input ${errors.email ? 'border-error' : ''}`}
                placeholder="Votre email"
                disabled={loading}
                {...register('email', { 
                  required: 'L\'email est requis',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Adresse email invalide'
                  }
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="form-label">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-input pr-10 ${errors.password ? 'border-error' : ''}`}
                  placeholder="Votre mot de passe"
                  disabled={loading}
                  {...register('password', { 
                    required: 'Le mot de passe est requis',
                    minLength: {
                      value: 6,
                      message: 'Le mot de passe doit contenir au moins 6 caractères'
                    }
                  })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-error">{errors.password.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : (
                <LogIn size={18} className="mr-2" />
              )}
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-primary-500 hover:underline">
              Retour au site public
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;