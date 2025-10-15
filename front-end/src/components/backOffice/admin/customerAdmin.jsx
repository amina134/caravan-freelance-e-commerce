import { useEffect, useState } from 'react';
import { Edit2, Trash2, Search, Plus } from 'lucide-react';
import './customerAdmin.css';
import { deleteUser, fetchAllUsers, postUser, updateUser } from '../../../api/userApi';

const CustomerAdmin = () => {
  const [users1, setUsers1] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load all users once
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const fetchedUsers = await fetchAllUsers();
      setUsers1(fetchedUsers);
      setLoading(false);
    };
    loadUsers();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewType, setViewType] = useState('table');
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Add User Modal
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [newUser, setNewUser] = useState({
    userName: '',
    email: '',
    phone: '',
    role: 'customer',
    status: 'active',
  });

  const roles = ['All', 'customer', 'admin'];

  // Filter users
  const filteredUsers = users1
    .filter((user) => {
      const matchesSearch =
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === 'All' || user.role === selectedRole;
      const matchesStatus = selectedStatus === 'All';
      return matchesSearch && matchesRole && matchesStatus;
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

  // delete user
  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers1(users1.filter((u) => u._id !== id));
      await deleteUser(id);
    }
  };

  // edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSaveUser = async () => {
    if (editingUser) {
      await updateUser(editingUser._id, editingUser);
      setUsers1(
        users1.map((user) =>
          user._id === editingUser._id ? editingUser : user
        )
      );
    }
    setShowModal(false);
    setEditingUser(null);
  };

  // add user 
  const handleAddUser = async () => {
    if (!newUser.userName || !newUser.email) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      
      const created = await postUser({...newUser});
      setUsers1([...users1, created]);
      setShowModalAdd(false);
      setNewUser({ userName: '', email: '', phone: '', role: 'customer' });
    } catch (error) {
      console.error('Error adding user please verify:', error);
    }
  };

  return (
    <div className="users-admin-container">
      <div className="users-admin-header">
        <div>
          <h1 className="users-admin-title">Users Management</h1>
          <p className="users-admin-subtitle">Manage all registered users</p>
        </div>
        <button className="btn-add-user" onClick={() => setShowModalAdd(true)}>
          <Plus size={20} /> Add User
        </button>
      </div>

      {/* 🔍 Filters */}
      <div className="users-filters-bar">
        <div className="search-box-users">
          <Search size={20} className="search-icon-users" />
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

      {/* 🔄 Users Table */}
      <div className="users-table-wrapper">
        {loading ? (
          <p>Loading users...</p>
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
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <span className={`role-badge role-${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td className="actions-cell">
                    <button
                      className="action-btn-small edit"
                      onClick={() => handleEditUser(user)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="action-btn-small delete"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 🧩 Edit User Modal */}
      {showModal && editingUser && (
        <div className="modal-overlay-users" onClick={() => setShowModal(false)}>
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
              <button className="btn-cancel-users" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn-save-users" onClick={handleSaveUser}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🆕 Add User Modal */}
      {showModalAdd && (
        <div className="modal-overlay-users" onClick={() => setShowModalAdd(false)}>
          <div className="modal-content-users" onClick={(e) => e.stopPropagation()}>
            <h2>Add New User</h2>
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
              <button className="btn-cancel-users" onClick={() => setShowModalAdd(false)}>
                Cancel
              </button>
              <button className="btn-save-users" onClick={handleAddUser}>
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAdmin;
