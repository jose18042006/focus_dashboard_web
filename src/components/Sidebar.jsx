import React from 'react';
import { LayoutDashboard, Users, DoorOpen, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ currentView, setCurrentView }) {
  const menuItems = [
    { id: 'overview', name: 'Inicio y KPIs', icon: LayoutDashboard },
    { id: 'users', name: 'Gestión de Usuarios', icon: Users },
    { id: 'rooms', name: 'Monitoreo de Salas', icon: DoorOpen },
  ];

  return (
    <div style={{
      width: '280px',
      height: '100vh',
      // Degradado moderno de oscuro a un sutil tono azulado/morado
      background: 'linear-gradient(180deg, #111827 0%, #1f2937 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      boxShadow: '4px 0 25px rgba(0,0,0,0.15)',
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      zIndex: 100
    }}>
      {/* Logo o Título con estilo de branding */}
      <div style={{ 
        padding: '32px 24px', 
        fontSize: '22px', 
        fontWeight: '800', 
        letterSpacing: '0.5px',
        borderBottom: '1px solid rgba(255,255,255,0.05)', 
        color: '#6366f1',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)', padding: '6px 10px', borderRadius: '8px' }}>⏱️</span>
        FocusAdmin
      </div>

      {/* Opciones del Menú */}
      <div style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px 16px',
                // Si está activo, tiene un fondo brillante translúcido
                backgroundColor: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                color: isActive ? '#818cf8' : '#9ca3af',
                border: 'none',
                borderRadius: '8px',
                textAlign: 'left',
                fontSize: '15px',
                fontWeight: isActive ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Icon size={20} style={{ color: isActive ? '#6366f1' : '#9ca3af' }} />
              {item.name}
            </button>
          );
        })}
      </div>

      {/* Botón de Cerrar Sesión estilizado al final */}
      <div style={{ padding: '24px 16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '12px 16px',
          backgroundColor: 'rgba(239, 68, 68, 0.05)',
          color: '#f87171',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '15px',
          fontWeight: '500',
          transition: 'all 0.2s ease'
        }}>
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}