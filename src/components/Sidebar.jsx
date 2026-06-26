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
      width: '260px',
      height: '100vh',
      backgroundColor: '#1e1e24',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
      fontFamily: 'sans-serif'
    }}>
      {/* Logo o Título de la App */}
      <div style={{ padding: '24px', fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid #2d2d35', color: '#4f46e5' }}>
        Focus Admin ⏱️
      </div>

      {/* Opciones del Menú */}
      <div style={{ flex: 1, padding: '16px 0' }}>
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
                gap: '12px',
                padding: '12px 24px',
                backgroundColor: isActive ? '#2d2d35' : 'transparent',
                color: isActive ? '#4f46e5' : '#b3b3b3',
                border: 'none',
                borderLeft: isActive ? '4px solid #4f46e5' : '4px solid transparent',
                textAlign: 'left',
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={20} />
              {item.name}
            </button>
          );
        })}
      </div>

      {/* Botón de Cerrar Sesión al final */}
      <div style={{ padding: '16px', borderTop: '1px solid #2d2d35' }}>
        <button style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px',
          backgroundColor: 'transparent',
          color: '#ef4444',
          border: 'none',
          cursor: 'pointer',
          fontSize: '15px'
        }}>
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}