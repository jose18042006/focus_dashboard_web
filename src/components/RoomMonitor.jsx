import React, { useEffect, useState } from 'react';
import { ShieldAlert, Users, Flame } from 'lucide-react';

export default function RoomMonitor() {
  const [activeRooms, setActiveRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Llamada HTTP al endpoint de salas del BFF
  useEffect(() => {
    fetch('http://localhost:3001/api/rooms')
      .then(res => res.json())
      .then(data => {
        setActiveRooms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al traer las salas desde el BFF:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ color: '#64748b', fontSize: '14px', marginTop: '20px' }}>Escaneando dimensiones y salas activas...</div>;
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginTop: '24px',
      width: '100%'
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
            }`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '220px'
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#111827', lineHeight: '1.4' }}>
              {room.name}
            </h3>
            <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#6b7280' }}>
              Creador: {room.host}
            </p>
          </div>

          <div>
            <hr style={{ border: 'none', borderTop: '1px solid #f3f4f6', margin: '16px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
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
        </div>
      ))}

      {activeRooms.length === 0 && (
        <div style={{ gridColumn: '1/-1', padding: '40px', textAlign: 'center', color: '#94a3b8', backgroundColor: '#fff', borderRadius: '12px' }}>
          No hay salas activas creadas en este momento por ningún Dungeon Master.
        </div>
      )}
    </div>
  );
}