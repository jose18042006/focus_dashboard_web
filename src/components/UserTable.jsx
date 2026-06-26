import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Edit2, Trash2, Check, X, AlertTriangle } from 'lucide-react';

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Estados para los Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Estado para el usuario seleccionado (Crear o Editar)
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  // Campos del Formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Alumno',
    status: 'Activo'
  });

  // 1. OBTENER USUARIOS (GET)
  const fetchUsers = () => {
    setLoading(true);
    fetch('http://localhost:3001/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al traer usuarios del BFF:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Abrir modal para crear nuevo
  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'Alumno', status: 'Activo' });
    setIsModalOpen(true);
  };

  // Abrir modal para editar existente
  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsModalOpen(true);
  };

  // 2. GUARDAR USUARIO (POST para crear / PUT para editar)
  const handleSaveUser = (e) => {
    e.preventDefault();

    if (editingUser) {
      // MODO EDICIÓN (PUT)
      fetch(`http://localhost:3001/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(res => res.json())
      .then(() => {
        fetchUsers(); // Recargamos la lista desde el servidor bff
        setIsModalOpen(false);
      })
      .catch(err => console.error("Error al actualizar usuario:", err));
    } else {
      // MODO CREACIÓN (POST)
      fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(res => res.json())
      .then(() => {
        fetchUsers(); // Recargamos la lista desde el servidor bff
        setIsModalOpen(false);
      })
      .catch(err => console.error("Error al crear usuario:", err));
    }
  };

  // Abrir modal de confirmación de eliminación
  const handleOpenDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  // 3. ELIMINAR USUARIO (DELETE)
  const handleConfirmDelete = () => {
    if (!userToDelete) return;

    fetch(`http://localhost:3001/api/users/${userToDelete.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
      fetchUsers(); // Recargamos la lista desde el servidor bff
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    })
    .catch(err => console.error("Error al eliminar usuario:", err));
  };

  // Filtrado por buscador
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div style={{ color: '#64748b', fontSize: '14px', marginTop: '20px' }}>Cargando gremio de usuarios...</div>;
  }

  return (
    <div style={{ marginTop: '24px', width: '100%' }}>
      {/* Barra de Herramientas */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '16px' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '260px', maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Buscar por nombre o correo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 12px 10px 40px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', backgroundColor: '#fff' }}
          />
        </div>

        <button 
          onClick={handleOpenCreateModal}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#4f46e5', color: '#fff', padding: '10px 16px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
        >
          <UserPlus size={16} />
          Nuevo Usuario
        </button>
      </div>

      {/* Tabla */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflowX: 'auto', width: '100%' }}>
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
              <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px 24px', color: '#0f172a', fontWeight: '500' }}>{user.name}</td>
                <td style={{ padding: '16px 24px', color: '#475569' }}>{user.email}</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    backgroundColor: user.role === 'Dungeon Master' ? '#f5f3ff' : '#f1f5f9',
                    color: user.role === 'Dungeon Master' ? '#7c3aed' : '#334155',
                    border: user.role === 'Dungeon Master' ? '1px solid #e9e3ff' : 'none',
                    padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: user.status === 'Activo' ? '#16a34a' : '#dc2626', fontWeight: '500' }}>
                    {user.status === 'Activo' ? <Check size={14} /> : <X size={14} />}
                    {user.status}
                  </span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => handleOpenEditModal(user)} style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', padding: 0 }}>
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleOpenDeleteModal(user)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0 }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORM MODAL (CREAR / EDITAR) */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '480px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
              {editingUser ? 'Editar Cuenta' : 'Registrar Nuevo Aventurero'}
            </h3>
            <form onSubmit={handleSaveUser} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Nombre Completo</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Correo Electrónico</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Rol Asignado</label>
                  <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', backgroundColor: '#fff', outline: 'none' }}>
                    <option value="Alumno">Alumno</option>
                    <option value="Dungeon Master">Dungeon Master</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Estado Inicial</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', backgroundColor: '#fff', outline: 'none' }}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#475569', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#4f46e5', color: '#fff', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                  {editingUser ? 'Guardar Cambios' : 'Registrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE ADVERTENCIA PARA ELIMINAR */}
      {isDeleteModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ backgroundColor: '#fef2f2', color: '#dc2626', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifycontent: 'center', margin: '0 auto 16px auto', justifyContent: 'center' }}>
              <AlertTriangle size={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>¿Eliminar usuario?</h3>
            <p style={{ marginTop: '8px', marginBottom: '24px', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
              Esta acción removerá permanentemente a <strong>{userToDelete?.name}</strong> del sistema. Esta operación no se puede deshacer.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setIsDeleteModalOpen(false)} style={{ flex: 1, padding: '10px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#475569', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Volver atrás</button>
              <button onClick={handleConfirmDelete} style={{ flex: 1, padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#dc2626', color: '#fff', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Sí, eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}