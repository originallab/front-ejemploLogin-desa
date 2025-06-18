// src/App.jsx - Versión de debug para identificar el componente problemático

import React from 'react';
import { Loader } from 'lucide-react';
import { AuthProvider } from './providers/AuthProvider';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';

// DEBUG: Verificar qué componentes se importaron correctamente
console.log('🔍 DEBUG - Verificando imports:');
console.log('  - ProtectedRoute:', ProtectedRoute);
console.log('  - HomePage:', HomePage);
console.log('  - DashboardPage:', DashboardPage);
console.log('  - AuthProvider:', AuthProvider);
console.log('  - useAuth:', useAuth);

// Verificar si alguno es undefined
if (!ProtectedRoute) console.error('❌ ProtectedRoute es undefined');
if (!HomePage) console.error('❌ HomePage es undefined');
if (!DashboardPage) console.error('❌ DashboardPage es undefined');
if (!AuthProvider) console.error('❌ AuthProvider es undefined');
if (!useAuth) console.error('❌ useAuth es undefined');

/**
 * Componente interno de la aplicación que consume el contexto de auth
 */
const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log('🔍 AppContent - Estado:', { isAuthenticated, isLoading });

  // Mostrar loading global mientras se inicializa la app
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader className="w-16 h-16 animate-spin mx-auto mb-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Inicializando Aplicación
          </h2>
          <p className="text-gray-600 text-lg">
            Verificando estado de autenticación...
          </p>
        </div>
      </div>
    );
  }

  // DEBUG: Verificar antes de renderizar
  console.log('🔍 Antes de renderizar - isAuthenticated:', isAuthenticated);
  
  // Renderizar la página correspondiente según el estado de autenticación
  return (
    <div className="min-h-screen">
      {isAuthenticated ? (
        // DEBUG: Verificar ProtectedRoute antes de usarlo
        ProtectedRoute ? (
          <ProtectedRoute fallback={HomePage ? <HomePage /> : <div>HomePage undefined</div>}>
            {DashboardPage ? <DashboardPage /> : <div>DashboardPage undefined</div>}
          </ProtectedRoute>
        ) : (
          <div className="p-8 bg-red-100 text-red-800">
            ERROR: ProtectedRoute es undefined
          </div>
        )
      ) : (
        // DEBUG: Verificar HomePage antes de usarlo
        HomePage ? <HomePage /> : (
          <div className="p-8 bg-red-100 text-red-800">
            ERROR: HomePage es undefined
          </div>
        )
      )}
    </div>
  );
};

/**
 * Componente principal de la aplicación
 * Envuelve toda la app con el AuthProvider
 */
const App = () => {
  console.log('🔍 App component - AuthProvider:', AuthProvider);
  
  return (
    AuthProvider ? (
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    ) : (
      <div className="p-8 bg-red-100 text-red-800">
        ERROR: AuthProvider es undefined
      </div>
    )
  );
};

export default App;