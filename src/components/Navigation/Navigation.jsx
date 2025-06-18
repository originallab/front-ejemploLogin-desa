// src/components/Navigation/Navigation.jsx

import React from 'react';
import { Shield, LogOut, Home, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

/**
 * Componente de navegación principal
 * Cambia según el estado de autenticación del usuario
 */
export const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout();
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Shield className="w-8 h-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">Mi App</span>
            </div>
          </div>
          
          {/* Área de usuario */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Información del usuario autenticado */}
                <div className="flex items-center space-x-3">
                  <img
                    src={user?.profile_img}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Usuario')}&background=3b82f6&color=ffffff`;
                    }}
                  />
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                
                {/* Botón de cerrar sesión */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200 border border-red-200 hover:border-red-300"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Cerrar Sesión</span>
                </button>
              </>
            ) : (
              <>
                {/* Indicador de página principal */}
                <div className="flex items-center space-x-2 text-gray-500">
                  <Home className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">Página Principal</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;