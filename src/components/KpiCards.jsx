import React from 'react';
import { Users, Clock, Brain } from 'lucide-react';

export default function KpiCards() {
  // Estos son los datos de prueba (Mock Data) que después vendrán del BFF Web
  const kpiData = [
    {
      title: 'Usuarios Activos Hoy',
      value: '142 alumnos',
      icon: Users,
      color: '#4f46e5', // Morado
      detail: '+12% respecto a ayer'
    },
    {
      title: 'Tiempo Promedio Focus',
      value: '48 min',
      icon: Clock,
      color: '#10b981', // Verde
      detail: 'Meta ideal: 45 min por sesión'
    },
    {
      title: 'Nivel de Atención Promedio',
      value: '84.5%',
      icon: Brain,
      color: '#f59e0b', // Amarillo/Naranja
      detail: 'Basado en tareas completadas'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginTop: '24px',
      marginBottom: '32px'
    }}>
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div 
            key={index}
            style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>{kpi.title}</span>
              <div style={{
                backgroundColor: `${kpi.color}15`, // Color con opacidad
                color: kpi.color,
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon size={20} />
              </div>
            </div>
            
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>
              {kpi.value}
            </div>
            
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>
              {kpi.detail}
            </div>
          </div>
        );
      })}
    </div>
  );
}