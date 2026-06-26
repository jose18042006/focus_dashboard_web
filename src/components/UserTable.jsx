import React, { useState } from 'react';
import { Search, UserPlus, Edit2, Trash2, Check, X, AlertTriangle } from 'lucide-react';

export default function UserTable() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Ignacio Silva', email: 'ignacio@focus.cl', role: 'Alumno', status: 'Activo' },
    { id: 2, name: 'Valeria Constanzo', email: 'v.constanzo@focus.cl', role: 'Dungeon Master', status: 'Activo' },
    { id: 3, name: 'Bastián Muñoz', email: 'bastian.m@focus.cl', role: 'Alumno', status: 'Inactivo' },
    { id: 4, name: 'Camila Rojas', email: 'camila.rojas@focus.cl', role: 'Alumno', status: 'Activo' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para controlar el modal de agregar/editar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' o 'edit'
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Estados para el modal personalizado de confirmación de eliminación
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Datos temporales del formulario (por defecto rol Alumno)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Alumno',
    status: 'Activo'
  });

  // Abrir modal para crear nuevo usuario
  const handleOpenAddModal = () => {
    setModalMode('add');
    setFormData({ name: '', email: '', role: 'Alumno', status: 'Activo' });
    setIsModalOpen(true);
  };

  // Abrir modal para editar un usuario existente
  const handleOpenEditModal = (user) => {
    setModalMode('edit');
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsModalOpen(true);
  };

  // Guardar datos (Creación o Modificación)
  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (modalMode === 'add') {
      const newUser = {
        id: Date.now(), // ID temporal único
        ...formData
      };
      setUsers([...users, newUser]);
    } else {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u));
    }
    setIsModalOpen(false);
  };

  // Iniciar flujo de confirmación de borrado
  const handleRequestDelete = (user) => {
    setUserToDelete(user);
    setIsDeleteConfirmOpen(true);
  };

  // Confirmar eliminación final
  const handleConfirmDelete = () => {
    setUsers(users.filter(u => u.id !== userToDelete.id));
    setIsDeleteConfirmOpen(false);
    setUserToDelete(null);
  };

  // Filtrado de usuarios por la barra de búsqueda
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ marginTop: '24px', width: '100%', position: 'relative' }}>
      
      {}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        gap: '16px'
      }}>
        {/* Buscador */}
        <div style={{ position: 'relative', flex: 1, minWidth: '260px', maxWidth: '400px' }}>
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
              border: '1px solid #e2e8f0',
              fontSize: '14px',
              boxSizing: 'border-box',
              outline: 'none',
              backgroundColor: '#fff'
            }}
          />
        </div>

        {/* Botón Nuevo Usuario */}
        <button 
          onClick={handleOpenAddModal}
          style={{
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
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.15)',
            transition: 'all 0.2s'
          }}
        >
          <UserPlus size={16} />
          Nuevo Usuario
        </button>
      </div>

      {}
      <div style={{ 
        backgroundColor: '#fff', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)', 
        overflowX: 'auto',
        width: '100%'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', minWidth: '600px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '16px 24px', color: '#475569', fontWeight: '600' }}>Nombre</th>
              <th style={{ padding: '16px 24px', color: '#475569', fontWeight: '600' }}>Correo Electrónico</th>
              <th style={{ padding: '16px 24px', color: '#475569', fontWeight: '600' }}>Rol</th>
              <th style={{ padding: '16px 24px', color: '#475569', fontWeight: '600' }}>Estado</th>
              <th style={{ padding: '16px 24px', color: '#475569', fontWeight: '600' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.2s' }}>
                <td style={{ padding: '16px 24px', color: '#0f172a', fontWeight: '500' }}>{user.name}</td>
                <td style={{ padding: '16px 24px', color: '#475569' }}>{user.email}</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    // Color de insignia morada/mágica para los Dungeon Masters
                    backgroundColor: user.role === 'Dungeon Master' ? '#f5f3ff' : '#f1f5f9',
                    color: user.role === 'Dungeon Master' ? '#7c3aed' : '#334155',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    border: user.role === 'Dungeon Master' ? '1px solid #ddd6fe' : '1px solid transparent'
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
                    <button 
                      onClick={() => handleOpenEditModal(user)}
                      style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', padding: 0 }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleRequestDelete(user)}
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

      {}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '480px',
            padding: '32px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
                {modalMode === 'add' ? 'Crear Nuevo Usuario' : 'Editar Usuario'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveUser} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Campo Nombre */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                  Nombre Completo
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Juan Pérez"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Campo Correo */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                  Correo Electrónico
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="Ej: juan.perez@focus.cl"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Campo Rol */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                  Rol en la App
                </label>
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    backgroundColor: '#fff'
                  }}
                >
                  <option value="Alumno">Alumno</option>
                  <option value="Dungeon Master">Dungeon Master</option>
                </select>
              </div>

              {/* Campo Estado */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                  Estado Inicial
                </label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    backgroundColor: '#fff'
                  }}
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

              {/* Botones de acción del Modal */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px', justifyContent: 'flex-end' }}>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '10px 18px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    color: '#475569',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  style={{
                    padding: '10px 18px',
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: '#4f46e5',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.15)'
                  }}
                >
                  {modalMode === 'add' ? 'Registrar' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {}
      {isDeleteConfirmOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '400px',
            padding: '32px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#ef4444',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <AlertTriangle size={24} />
            </div>

            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
              ¿Eliminar usuario?
            </h3>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
              ¿Estás seguro de que deseas eliminar a <strong>{userToDelete?.name}</strong>? Esta acción no se puede deshacer.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                onClick={() => setIsDeleteConfirmOpen(false)}
                style={{
                  padding: '10px 18px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  color: '#475569',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                No, mantener
              </button>
              <button 
                onClick={handleConfirmDelete}
                style={{
                  padding: '10px 18px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  flex: 1,
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)'
                }}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}