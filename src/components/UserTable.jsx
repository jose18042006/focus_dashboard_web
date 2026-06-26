import React, { useState } from 'react';
import { Search, UserPlus, Edit2, Trash2, Check, X } from 'lucide-react';

export default function UserTable() {
  // Datos de simulación (Mock Data) para el CRUD
  const [users, setUsers] = useState([
    { id: 1, name: 'Ignacio Silva', email: 'ignacio@focus.cl', role: 'Alumno', status: 'Activo' },
    { id: 2, name: 'Valeria Constanzo', email: 'v.constanzo@focus.cl', role: 'Docente (Master)', status: 'Activo' },
    { id: 3, name: 'Bastián Muñoz', email: 'bastian.m@focus.cl', role: 'Alumno', status: 'Inactivo' },
    { id: 4, name: 'Camila Rojas', email: 'camila.rojas@focus.cl', role: 'Alumno', status: 'Activo' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Filtramos los usuarios en tiempo real por nombre o correo
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función simulada para eliminar
  const handleDelete = (id) => {
    if(confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div style={{ marginTop: '24px' }}>
      {/* Barra de Herramientas: Buscador y Botón Añadir */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        gap: '16px'
      }}>
        {/* Input de búsqueda */}
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Buscar por nombre o correo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 40px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
        </div>

        {/* Botón Nuevo Usuario */}
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#4f46e5',
          color: '#fff',
          padding: '10px 16px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          <UserPlus size={16} />
          Nuevo Usuario
        </button>
      </div>

      {/* Contenedor de la Tabla */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '16px 24px', color: '#374151', fontWeight: '600' }}>Nombre</th>
              <th style={{ padding: '16px 24px', color: '#374151', fontWeight: '600' }}>Correo Electrónico</th>
              <th style={{ padding: '16px 24px', color: '#374151', fontWeight: '600' }}>Rol</th>
              <th style={{ padding: '16px 24px', color: '#374151', fontWeight: '600' }}>Estado</th>
              <th style={{ padding: '16px 24px', color: '#374151', fontWeight: '600', textAling: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb', transition: 'background-color 0.2s' }}>
                <td style={{ padding: '16px 24px', color: '#111827', fontWeight: '500' }}>{user.name}</td>
                <td style={{ padding: '16px 24px', color: '#4b5563' }}>{user.email}</td>
                <td style={{ padding: '16px 24px', color: '#4b5563' }}>
                  <span style={{
                    backgroundColor: user.role === 'Docente (Master)' ? '#eff6ff' : '#f3f4f6',
                    color: user.role === 'Docente (Master)' ? '#1d4ed8' : '#374151',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: user.status === 'Activo' ? '#16a34a' : '#dc2626',
                    fontWeight: '500'
                  }}>
                    {user.status === 'Activo' ? <Check size={14} /> : <X size={14} />}
                    {user.status}
                  </span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', padding: 0 }}>
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0 }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: '#9ca3af' }}>
                  No se encontraron usuarios que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}