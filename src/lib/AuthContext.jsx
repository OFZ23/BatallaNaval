import React, { createContext, useState, useContext, useEffect } from 'react';
import { sdkClient } from '@/api/client';
import { appParams } from '@/lib/app-params';
import { createAxiosClient } from '@/lib/sdk';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null);
  const [offlineMode, setOfflineMode] = useState(false); // Track if we're in offline mode

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    try {
      setIsLoadingPublicSettings(true);
      setAuthError(null);
      
      // Detect if we're in a static-only environment (GitHub Pages, etc.)
      const isStaticHost =
        window.location.hostname === 'ofz23.github.io' ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';

      // If in static/offline environment, skip backend checks
      if (isStaticHost && !appParams.token) {
        // Use mock settings for local/offline play
        setOfflineMode(true);
        setAppPublicSettings({
          id: 'local-app',
          public_settings: {
            name: 'Batalla Naval',
            description: 'Juego de Batalla Naval - Modo Local',
            offline: true
          }
        });
        setIsLoadingPublicSettings(false);
        setIsLoadingAuth(false);
        setAuthChecked(true);
        return;
      }

      // Try to fetch app public settings (only if token or explicit server is configured)
      const appClient = createAxiosClient({
        baseURL: `/api/apps/public`,
        headers: {
          'X-App-Id': appParams.appId
        },
        token: appParams.token,
        interceptResponses: true
      });
      
      try {
        const publicSettings = await appClient.get(`/prod/public-settings/by-id/${appParams.appId}`);
        setAppPublicSettings(publicSettings);
        setOfflineMode(false);

        if (appParams.token) {
          await checkUserAuth();
        } else {
          setIsLoadingAuth(false);
          setIsAuthenticated(false);
          setAuthChecked(true);
        }
        setIsLoadingPublicSettings(false);
      } catch (appError) {
        // If backend is unavailable, fall back to offline mode
        console.warn('Backend unavailable - running in offline mode');
        setOfflineMode(true);
        setAppPublicSettings({
          id: 'local-app',
          public_settings: {
            name: 'Batalla Naval',
            description: 'Juego de Batalla Naval - Modo Offline',
            offline: true
          }
        });
        setIsLoadingPublicSettings(false);
        setIsLoadingAuth(false);
        setAuthChecked(true);
      }
    } catch (error) {
      console.warn('Unexpected error during app state check:', error);
      // Even on unexpected error, allow app to load in offline mode
      setOfflineMode(true);
      setAppPublicSettings({
        id: 'local-app',
        public_settings: {
          name: 'Batalla Naval',
          offline: true
        }
      });
      setIsLoadingPublicSettings(false);
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  };

  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true);
      const currentUser = await sdkClient.auth.me();
      setUser(currentUser);
      setIsAuthenticated(true);
      setIsLoadingAuth(false);
      setAuthChecked(true);
    } catch (error) {
      console.warn('User auth check failed - using offline mode');
      setIsLoadingAuth(false);
      setIsAuthenticated(false);
      setAuthChecked(true);
      // Don't show error - allow offline play
    }
  };

  const logout = (shouldRedirect = true) => {
    setUser(null);
    setIsAuthenticated(false);
    
    if (shouldRedirect && !offlineMode) {
      sdkClient.auth.logout(window.location.href);
    } else {
      sdkClient.auth.logout();
    }
  };

  const navigateToLogin = () => {
    // Skip login redirect in offline mode
    if (!offlineMode) {
      sdkClient.auth.redirectToLogin(window.location.href);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      authChecked,
      offlineMode,
      logout,
      navigateToLogin,
      checkUserAuth,
      checkAppState
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
