import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import UserTable from './components/UserTable';
import RoomMonitor from './components/RoomMonitor';
import KpiCards from './components/KpiCards';
import AnalyticsChart from './components/AnalyticsChart';

export default function App() {
  // Este estado define qué pestaña del menú tiene seleccionada el administrador
  const [currentView, setCurrentView] = useState('overview');

  return (
    <div style={{ display: 'flex', backgroundColor: '#f3f4f6', minHeight: '100vh', width: '100%' }}>
      {/* Barra lateral fija a la izquierda */}
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Contenedor de la derecha (Contenido Principal) */}
      <div style={{ 
        marginLeft: '260px', 
        flex: 1, 
        padding: '40px', 
        fontFamily: 'sans-serif',
        boxSizing: 'border-box'
      }}>
        
        {/* VISTA 1: INICIO Y KPIS GLOBALES */}
        {currentView === 'overview' && (
          <div style={{ width: '100%' }}>
            <h1 style={{ color: '#111827', margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
              Inicio y KPIs Globales
            </h1>
            <p style={{ color: '#6b7280', marginTop: '4px', marginBottom: '24px' }}>
              Métricas e indicadores de rendimiento general de la aplicación Focus.
            </p>
            
            {/* Tarjetas Superiores */}
            <KpiCards />
            
            {/* Gráfico de Líneas Interactivo */}
            <AnalyticsChart />
          </div>
        )}

        {/* VISTA 2: GESTIÓN DE USUARIOS */}
        {currentView === 'users' && (
          <div style={{ width: '100%' }}>
            <h1 style={{ color: '#111827', margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
              Gestión de Usuarios
            </h1>
            <p style={{ color: '#6b7280', marginTop: '4px' }}>
              Panel de administración para crear, modificar o eliminar cuentas de alumnos y docentes.
            </p>

            {/* AQUI CONECTAMOS LA TABLA */}
            <UserTable />
          </div>
        )}

        {/* VISTA 3: MONITOREO DE SALAS */}
        {currentView === 'rooms' && (
          <div style={{ width: '100%' }}>
            <h1 style={{ color: '#111827', margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
              Monitoreo de Salas
            </h1>
            <p style={{ color: '#6b7280', marginTop: '4px' }}>
              Visualización en tiempo real de las salas activas creadas por los Dueños Master.
            </p>

            <RoomMonitor />
          </div>
        )}

      </div>
    </div>
  );
}