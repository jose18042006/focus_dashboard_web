import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
export default function AnalyticsChart() {
  // Datos de prueba: Alumnos conectados según la hora del día
  const data = [
    { hora: '08:00', alumnos: 30, atencionMedia: 88 },
    { hora: '10:00', alumnos: 110, atencionMedia: 85 },
    { hora: '12:00', alumnos: 142, atencionMedia: 82 },
    { hora: '14:00', alumnos: 45, atencionMedia: 78 },
    { hora: '16:00', alumnos: 95, atencionMedia: 86 },
    { hora: '18:00', alumnos: 120, atencionMedia: 84 },
    { hora: '20:00', alumnos: 60, atencionMedia: 80 },
  ];

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      marginTop: '24px'
    }}>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', margin: '0 0 20px 0' }}>
        Flujo de Conexión y Atención por Hora
      </h2>
      
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="hora" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip />
            <Legend />
            {/* Línea 1: Cantidad de alumnos */}
            <Line type="monotone" dataKey="alumnos" name="Alumnos Conectados" stroke="#4f46e5" strokeWidth={3} activeDot={{ r: 8 }} />
            {/* Línea 2: Porcentaje de atención */}
            <Line type="monotone" dataKey="atencionMedia" name="% Atención Promedio" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}