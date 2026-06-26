import React, { useEffect, useState } from 'react';
import { Users, Clock, Brain } from 'lucide-react';

export default function KpiCards() {
  // Estado para guardar el arreglo de estadísticas que viene del BFF
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Llamada HTTP al endpoint exacto de tu BFF
  useEffect(() => {
    fetch('http://localhost:3001/api/stats/summary')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar métricas del BFF:", err);
        setLoading(false);
      });
  }, []);

  if (loading || stats.length === 0) {
    return <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Cargando indicadores en vivo desde el BFF...</div>;
  }

  // Mapeamos los iconos y colores según el orden en que vienen tus objetos del backend
  const iconsConfig = [
    { icon: Users, color: '#6366f1', bgColor: '#e0e7ff' }, // Para 'Usuarios Activos Hoy'
    { icon: Clock, color: '#10b981', bgColor: '#d1fae5' }, // Para 'Tiempo Promedio Focus'
    { icon: Brain, color: '#f59e0b', bgColor: '#fef3c7' }  // Para 'Nivel de Atención Promedio'
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '24px',
      marginBottom: '32px',
      width: '100%'
    }}>
      {stats.map((card, index) => {
        // Asignamos icono por posición o por si acaso uno por defecto
        const config = iconsConfig[index] || iconsConfig[0];
        const Icon = config.icon;

        return (
          <div
            key={index}
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #f1f5f9'
            }}
          >
            <div>
              <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>{card.title}</span>
              <h2 style={{ margin: '8px 0 4px 0', fontSize: '28px', fontWeight: '700', color: '#0f172a' }}>
                {card.value}
              </h2>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>{card.detail}</span>
            </div>
            
            <div style={{
              backgroundColor: config.bgColor,
              color: config.color,
              padding: '12px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon size={22} />
            </div>
          </div>
        );
      })}
    </div>
  );
}