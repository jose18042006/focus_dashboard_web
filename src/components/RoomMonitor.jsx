import React from 'react';
import { ShieldAlert, Users, Flame } from 'lucide-react';

export default function RoomMonitor() {
  // Datos de prueba de salas activas en la app
  const activeRooms = [
    { id: 1, name: 'Sala de Estudio: Álgebra Lineal', host: 'Prof. Carlos Retamal', participants: 18, avgFocus: '89%', status: 'Alta Concentración' },
    { id: 2, name: 'Laboratorio de Programación Python', host: 'Dra. María Paz', participants: 32, avgFocus: '74%', status: 'Normal' },
    { id: 3, name: 'Grupo de Repaso: Historia Universal', host: 'Prof. Juan Pérez', participants: 8, avgFocus: '45%', status: 'Distracción Detectada' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '24px',
      marginTop: '24px'
    }}>
      {activeRooms.map((room) => (
        <div 
          key={room.id}
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            borderTop: `4px solid ${
              room.status === 'Alta Concentración' ? '#10b981' : 
              room.status === 'Normal' ? '#4f46e5' : '#ef4444'
            }`
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#111827' }}>{room.name}</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#6b7280' }}>Creador: {room.host}</p>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f3f4f6', margin: '16px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4b5563', fontSize: '14px' }}>
              <Users size={16} />
              <span>{room.participants} alumnos</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4b5563', fontSize: '14px' }}>
              <Flame size={16} style={{ color: '#f59e0b' }} />
              <span>Focus: <strong>{room.avgFocus}</strong></span>
            </div>
          </div>

          <div style={{
            marginTop: '16px',
            backgroundColor: `${
              room.status === 'Alta Concentración' ? '#e6f4ea' : 
              room.status === 'Normal' ? '#eff6ff' : '#fce8e6'
            }`,
            color: `${
              room.status === 'Alta Concentración' ? '#137333' : 
              room.status === 'Normal' ? '#1c3aa9' : '#c5221f'
            }`,
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            {room.status === 'Distracción Detectada' && <ShieldAlert size={14} />}
            Status: {room.status}
          </div>
        </div>
      ))}
    </div>
  );
}