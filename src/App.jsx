import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import KpiCards from './components/KpiCards';
import AnalyticsChart from './components/AnalyticsChart';
import UserTable from './components/UserTable';
import RoomMonitor from './components/RoomMonitor';

export default function App() {
  const [currentView, setCurrentView] = useState('overview');

  return (
    <div style={{ 
      display: 'flex', 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh', 
      width: '100%',
      margin: 0,
      padding: 0,
    }}>
      {/* Barra lateral fija (Ancho: 280px) */}
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Contenedor Principal Adaptativo */}
      <div style={{ 
        marginLeft: '280px', // Desplazamiento exacto para no pisar el sidebar
        flex: 1, 
        padding: '40px 24px', // Reducimos padding lateral para pantallas medianas
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        width: 'calc(100% - 280px)', // El contenedor ocupa exactamente el espacio restante
        overflowX: 'hidden' // Protege contra desbordes accidentales de componentes internos
      }}>
        
        {/* Contenedor interno que limita el ancho máximo en pantallas gigantes */}
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          
          {/* VISTA 1: INICIO Y KPIS GLOBALES */}
          {currentView === 'overview' && (
            <div style={{ width: '100%' }}>
              <h1 style={{ color: '#0f172a', margin: 0, fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>
                Inicio y KPIs Globales
              </h1>
              <p style={{ color: '#64748b', marginTop: '6px', marginBottom: '32px', fontSize: '14px' }}>
                Métricas e indicadores de rendimiento general de la aplicación Focus.
              </p>
              
              <KpiCards />
              <AnalyticsChart />
            </div>
          )}

          {/* VISTA 2: GESTIÓN DE USUARIOS */}
          {currentView === 'users' && (
            <div style={{ width: '100%' }}>
              <h1 style={{ color: '#0f172a', margin: 0, fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>
                Gestión de Usuarios
              </h1>
              <p style={{ color: '#64748b', marginTop: '6px', marginBottom: '32px', fontSize: '14px' }}>
                Panel de administración para crear, modificar o eliminar cuentas de alumnos y Dungeon Masters.
              </p>

              <UserTable />
            </div>
          )}

          {/* VISTA 3: MONITOREO DE SALAS */}
          {currentView === 'rooms' && (
            <div style={{ width: '100%' }}>
              <h1 style={{ color: '#0f172a', margin: 0, fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>
                Monitoreo de Salas
              </h1>
              <p style={{ color: '#64748b', marginTop: '6px', marginBottom: '32px', fontSize: '14px' }}>
                Visualización en tiempo real de las salas activas creadas por los Dungeon Masters.
              </p>

              <RoomMonitor />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}