import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import BattleShip from './pages/BattleShip';
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin, offlineMode } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors only in authenticated mode
  // In offline mode, skip authentication requirements
  if (authError && !offlineMode) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app (works in both authenticated and offline modes)
  return (
    <Routes>
      <Route path="/" element={<BattleShip />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  // Compute a basename for react-router based on environment.
  // On GitHub Pages the app is served under a repository subpath (e.g. /BatallaNaval/).
  // Use import.meta.env.BASE_URL when available, but override to '/BatallaNaval/' when
  // running on github.io to ensure the router resolves routes correctly in production.
  const basename = (typeof window !== 'undefined' && window.location.hostname && window.location.hostname.includes('github.io'))
    ? '/BatallaNaval/'
    : (import.meta.env.BASE_URL || '/');

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router basename={basename}>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App