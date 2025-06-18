// src/pages/DashboardPage/DashboardPage.jsx

import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Settings, 
  History, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Navigation from '../../components/Navigation';

/**
 * Página del dashboard para usuarios autenticados
 * Muestra información del usuario y herramientas disponibles
 */
export const DashboardPage = () => {
  const { user, validateSession, refreshUserData } = useAuth();
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  const handleValidateSession = async () => {
    setIsValidating(true);
    setValidationResult(null);
    
    try {
      const isValid = await validateSession();
      setValidationResult({
        success: isValid,
        message: isValid ? 'Sesión válida y actualizada' : 'Sesión inválida o expirada',
        timestamp: new Date().toLocaleString()
      });
    } catch (error) {
      setValidationResult({
        success: false,
        message: `Error de validación: ${error.message}`,
        timestamp: new Date().toLocaleString()
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleRefreshData = async () => {
    try {
      await refreshUserData();
      alert('Datos actualizados correctamente');
    } catch (error) {
      alert(`Error actualizando datos: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header de bienvenida */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ¡Bienvenido, {user?.name}!
          </h1>
          <p className="text-gray-600 text-lg">
            Has accedido exitosamente a la zona autenticada de la aplicación.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Información del Usuario */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={user?.profile_img}
                  alt={user?.name}
                  className="w-20 h-20 rounded-full border-4 border-gray-200"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Usuario')}&background=3b82f6&color=ffffff&size=80`;
                  }}
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Perfil de Usuario</h3>
                  <p className="text-gray-600">Información personal</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nombre</p>
                    <p className="text-gray-900">{user?.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-gray-900">{user?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Teléfono</p>
                    <p className="text-gray-900">{user?.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Información de Sesión */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Estado de Sesión</h3>
                  <p className="text-gray-600">Información de seguridad</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">ID de Sesión</p>
                  <p className="text-xs font-mono bg-gray-100 p-2 rounded break-all">
                    {user?.session}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-700">Sesión activa y verificada</span>
                </div>
                
                <button
                  onClick={handleValidateSession}
                  disabled={isValidating}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isValidating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Validando...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      <span>Validar Sesión</span>
                    </>
                  )}
                </button>
                
                {validationResult && (
                  <div className={`p-3 rounded-lg ${validationResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-center space-x-2">
                      {validationResult.success ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${validationResult.success ? 'text-green-800' : 'text-red-800'}`}>
                        {validationResult.message}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {validationResult.timestamp}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Panel Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Acciones Rápidas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Acciones Disponibles</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <button 
                  onClick={() => alert('Función de configuración en desarrollo')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-6 h-6 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Configuración</p>
                    <p className="text-sm text-gray-500">Ajustar preferencias</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => alert('Función de historial en desarrollo')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <History className="w-6 h-6 text-purple-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Historial</p>
                    <p className="text-sm text-gray-500">Ver actividad reciente</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => alert('Función de exportación en desarrollo')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-6 h-6 text-green-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Exportar Datos</p>
                    <p className="text-sm text-gray-500">Descargar información</p>
                  </div>
                </button>
                
                <button 
                  onClick={handleRefreshData}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className="w-6 h-6 text-orange-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Actualizar</p>
                    <p className="text-sm text-gray-500">Refrescar datos</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Información Técnica */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Información Técnica de la Sesión
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-sm text-gray-600 overflow-x-auto">
{JSON.stringify({
  session_info: {
    session_id: user?.session,
    user_email: user?.email,
    authenticated: true,
    last_validation: new Date().toISOString()
  },
  api_endpoints: {
    callback: '/callback',
    validate_session: '/validate_session'
  },
  security: {
    session_type: 'unique_temporal',
    validation_method: 'api_endpoint',
    storage: 'localStorage'
  }
}, null, 2)}
                </pre>
              </div>
              
              <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Última actualización: {new Date().toLocaleString()}</span>
              </div>
            </div>

            {/* Estadísticas de uso */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Estadísticas de Uso</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">1</p>
                  <p className="text-sm text-gray-600">Sesiones Activas</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">100%</p>
                  <p className="text-sm text-gray-600">Tiempo Activo</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">0</p>
                  <p className="text-sm text-gray-600">Errores</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;