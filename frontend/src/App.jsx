import AppRouter from './router/AppRouter';
import { useAuth } from './context/AuthContext'; 

const App = () => {
  const { user, accesstoken, loading, isAuthenticated } = useAuth(); 
  console.log('[App.jsx] useAuth:', {
    user,
    accesstoken,
    loading,
    isAuthenticated,
  });

  return <AppRouter />;
};

export default App;
