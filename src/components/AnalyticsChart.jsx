import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function AnalyticsChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/stats/chart')
      .then(res => res.json())
      .then(chartData => {
        setData(chartData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar datos del gráfico:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ color: '#64748b', fontSize: '14px', marginTop: '20px' }}>Cargando analíticas en vivo...</div>;
  }

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      border: '1px solid #f1f5f9',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>Flujo de Alumnos y Atención</h3>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>Monitoreo histórico por bloques de horas del día de hoy.</p>
      </div>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAlumnos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAtencion" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="hora" stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
            
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px' }}
              labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
            />
            <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
            
            <Area name="Alumnos Conectados" type="monotone" dataKey="alumnos" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorAlumnos)" />
            <Area name="Atención Media (%)" type="monotone" dataKey="atencionMedia" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorAtencion)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}