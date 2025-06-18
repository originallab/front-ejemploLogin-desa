// src/pages/HomePage/HomePage.jsx

import React from 'react';
import { LogIn, Shield, ArrowRight, CheckCircle, Globe, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Navigation from '../../components/Navigation';

/**
 * Página de inicio para usuarios no autenticados
 * Muestra información sobre la app y el botón de login
 */
export const HomePage = () => {
  const { preLogin, isLoading, isRedirecting } = useAuth();

  const handleStartLogin = async () => {
    try {
      await preLogin();
    } catch (error) {
      console.error('Error iniciando login:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header principal */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Bienvenido a Mi Aplicación
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Una aplicación moderna que demuestra el flujo de autenticación seguro
            con sesiones personalizadas y integración con APIs externas.
          </p>
          
          {/* Badges de características */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <Shield className="w-4 h-4 mr-1" />
              Seguro
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <Globe className="w-4 h-4 mr-1" />
              API Externa
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              <Lock className="w-4 h-4 mr-1" />
              Sesiones Únicas
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Formulario de login */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Acceder a la Plataforma
              </h2>
              <p className="text-gray-600">
                Inicia sesión para acceder a todas las funcionalidades de la aplicación.
                Serás redirigido a nuestro sistema de autenticación seguro.
              </p>
            </div>
            
            <button
              onClick={handleStartLogin}
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Iniciar Sesión</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="mt-6 text-center">
              {isRedirecting ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">
                    🌐 Redirigiendo a originalauth.com...
                  </p>
                  <p className="text-blue-600 text-sm mt-1">
                    Serás redirigido al sistema de autenticación externo
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Al iniciar sesión, aceptas nuestros términos y condiciones
                </p>
              )}
            </div>
          </div>

          {/* Información del flujo */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Flujo de Autenticación Seguro
              </h3>
              <p className="text-gray-600 mb-6">
                Nuestra aplicación utiliza un sistema de autenticación moderno
                que garantiza la seguridad de tus datos mediante:
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Generación de Sesión Única",
                  description: "Se crea una sesión única y temporal para tu proceso de login"
                },
                {
                  step: "2", 
                  title: "Redirección Segura",
                  description: "Te redirigimos a nuestro sistema de autenticación externo"
                },
                {
                  step: "3",
                  title: "Validación Automática", 
                  description: "El sistema valida tu identidad y procesa el callback"
                },
                {
                  step: "4",
                  title: "Acceso Autorizado",
                  description: "Regresas a la aplicación con acceso completo y seguro"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">{item.step}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Características adicionales */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            ¿Por qué elegir nuestra plataforma?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Seguridad Avanzada",
                description: "Protocolo de autenticación robusto con validación de sesiones en tiempo real"
              },
              {
                icon: Globe,
                title: "Integración Externa",
                description: "Conexión seamless con sistemas de autenticación de terceros"
              },
              {
                icon: CheckCircle,
                title: "Experiencia Fluida",
                description: "Proceso de login intuitivo y rápido sin comprometer la seguridad"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;