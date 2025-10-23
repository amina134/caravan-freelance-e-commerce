import { useEffect, useState } from 'react';
import { Edit2, Trash2, Search, Plus } from 'lucide-react';
import { deleteUser, fetchAllUsers, postUser, updateUser } from '../../../api/userApi';
import './customerAdmin.css';
const CustomerAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const fetchedUsers = await fetchAllUsers();
      setUsers(fetchedUsers);
      setLoading(false);
    };
    loadUsers();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newUser, setNewUser] = useState({
    userName: '',
    email: '',
    phone: '',
    role: 'customer',
  });

  const roles = ['All', 'customer', 'admin'];

  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === 'All' || user.role === selectedRole;
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'name':
          return a.userName.localeCompare(b.userName);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((u) => u._id !== id));
      await deleteUser(id);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleSaveUser = async () => {
    if (editingUser) {
      await updateUser(editingUser._id, editingUser);
      setUsers(users.map((user) => (user._id === editingUser._id ? editingUser : user)));
    }
    setShowEditModal(false);
    setEditingUser(null);
  };

  const handleAddUser = async () => {
    if (!newUser.userName || !newUser.email) {
      alert('Please fill in all required fields.');
      return;
    }
    try {
      const created = await postUser({ ...newUser });
      setUsers([...users, created]);
      setShowAddModal(false);
      setNewUser({ userName: '', email: '', phone: '', role: 'customer' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="users-admin-container">
      <div className="users-admin-header">
        <div>
          <h1 className="users-admin-title">Users Management</h1>
          <p className="users-admin-subtitle">Manage all registered users</p>
        </div>
        <button className="btn-add-user" onClick={() => setShowAddModal(true)}>
          <Plus size={18} /> Add User
        </button>
      </div>

      {/* Filters */}
      <div className="users-filters-bar">
        <div className="search-box-users">
          <Search size={18} className="search-icon-users" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="search-input-users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-group">
          <select
            className="filter-select"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role === 'All' ? 'All Roles' : role}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="users-table-wrapper">
        {loading ? (
          <p>Loading users...</p>
        ) : filteredUsers.length === 0 ? (
          <div className="empty-state-users">No users found.</div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="user-name">{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <span className={`role-badge role-${user.role}`}>{user.role}</span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td className="actions-cell">
                    <button className="action-btn-small edit" onClick={() => handleEditUser(user)}>
                      <Edit2 size={15} />
                    </button>
                    <button className="action-btn-small delete" onClick={() => handleDeleteUser(user._id)}>
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingUser && (
        <div className="modal-overlay-users" onClick={() => setShowEditModal(false)}>
          <div className="modal-content-users" onClick={(e) => e.stopPropagation()}>
            <h2>Edit User</h2>
            <div className="modal-form">
              <div className="form-group-users">
                <label>Name</label>
                <input
                  type="text"
                  value={editingUser.userName}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, userName: e.target.value })
                  }
                />
              </div>
              <div className="form-group-users">
                <label>Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                />
              </div>
              <div className="form-group-users">
                <label>Phone</label>
                <input
                  type="tel"
                  value={editingUser.phone}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, phone: e.target.value })
                  }
                />
              </div>
              <div className="form-group-users">
                <label>Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value })
                  }
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-cancel-users" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="btn-save-users" onClick={handleSaveUser}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay-users" onClick={() => setShowAddModal(false)}>
          <div className="modal-content-users" onClick={(e) => e.stopPropagation()}>
            <h2>Add User</h2>
            <div className="modal-form">
              <div className="form-group-users">
                <label>Name</label>
                <input
                  type="text"
                  value={newUser.userName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, userName: e.target.value })
                  }
                />
              </div>
              <div className="form-group-users">
                <label>Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </div>
              <div className="form-group-users">
                <label>Phone</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone: e.target.value })
                  }
                />
              </div>
              <div className="form-group-users">
                <label>Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-cancel-users" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="btn-save-users" onClick={handleAddUser}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAdmin;
