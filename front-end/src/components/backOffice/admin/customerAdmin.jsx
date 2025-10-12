import { useState } from 'react';
import { Edit2, Trash2, Search, Plus, Eye, EyeOff, MoreVertical } from 'lucide-react';
import './customerAdmin.css';

const CustomerAdmin = () => {
  const [users, setUsers] = useState([
    {
      _id: '1',
      userName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      role: 'customer',
      joinDate: '2024-01-15',
      status: 'active',
      orders: 12
    },
    {
      _id: '2',
      userName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234 567 8901',
      role: 'customer',
      joinDate: '2024-02-20',
      status: 'active',
      orders: 8
    },
    {
      _id: '3',
      userName: 'Bob Wilson',
      email: 'bob@example.com',
      phone: '+1 234 567 8902',
      role: 'admin',
      joinDate: '2023-12-01',
      status: 'active',
      orders: 0
    },
    {
      _id: '4',
      userName: 'Alice Brown',
      email: 'alice@example.com',
      phone: '+1 234 567 8903',
      role: 'customer',
      joinDate: '2024-03-10',
      status: 'inactive',
      orders: 3
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewType, setViewType] = useState('table');
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const roles = ['All', 'customer', 'admin'];
  const statuses = ['All', 'active', 'inactive'];

  const filteredUsers = users
    .filter(user => {
      const matchesSearch = 
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === 'All' || user.role === selectedRole;
      const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'oldest':
          return new Date(a.joinDate) - new Date(b.joinDate);
        case 'orders':
          return b.orders - a.orders;
        case 'name':
          return a.userName.localeCompare(b.userName);
        default: // newest
          return new Date(b.joinDate) - new Date(a.joinDate);
      }
    });

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u._id !== id));
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(users.map(u => u._id === editingUser._id ? editingUser : u));
    }
    setShowModal(false);
    setEditingUser(null);
  };

  return (
    <div className="users-admin-container">
      <div className="users-admin-header">
        <div>
          <h1 className="users-admin-title">Users Management</h1>
          <p className="users-admin-subtitle">Manage all registered users</p>
        </div>
        <button className="btn-add-user">
          <Plus size={20} /> Add User
        </button>
      </div>

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
            {roles.map(role => (
              <option key={role} value={role}>{role === 'All' ? 'All Roles' : role}</option>
            ))}
          </select>

          <select 
            className="filter-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status === 'All' ? 'All Status' : status}</option>
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
            <option value="orders">Most Orders</option>
          </select>

          <div className="view-toggle">
            <button 
              className={`view-btn ${viewType === 'table' ? 'active' : ''}`}
              onClick={() => setViewType('table')}
              title="Table View"
            >
              ≡
            </button>
            <button 
              className={`view-btn ${viewType === 'card' ? 'active' : ''}`}
              onClick={() => setViewType('card')}
              title="Card View"
            >
              ⊞
            </button>
          </div>
        </div>
      </div>

      {viewType === 'table' ? (
        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Orders</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id} className={`status-${user.status}`}>
                  <td className="user-name">{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <span className={`role-badge role-${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge status-${user.status}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                  <td className="order-count">{user.orders}</td>
                  <td className="actions-cell">
                    <button 
                      className="action-btn-small edit"
                      onClick={() => handleEditUser(user)}
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      className="action-btn-small delete"
                      onClick={() => handleDeleteUser(user._id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="users-grid">
          {filteredUsers.map(user => (
            <div key={user._id} className="user-card">
              <div className="card-header">
                <div>
                  <h3 className="card-name">{user.userName}</h3>
                  <span className={`role-badge role-${user.role}`}>
                    {user.role}
                  </span>
                </div>
                <span className={`status-badge status-${user.status}`}>
                  {user.status}
                </span>
              </div>

              <div className="card-body">
                <div className="card-row">
                  <span className="label">Email:</span>
                  <span className="value">{user.email}</span>
                </div>
                <div className="card-row">
                  <span className="label">Phone:</span>
                  <span className="value">{user.phone}</span>
                </div>
                <div className="card-row">
                  <span className="label">Joined:</span>
                  <span className="value">{new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="card-row">
                  <span className="label">Orders:</span>
                  <span className="value">{user.orders}</span>
                </div>
              </div>

              <div className="card-footer">
                <button 
                  className="action-btn-card edit"
                  onClick={() => handleEditUser(user)}
                >
                  <Edit2 size={16} /> Edit
                </button>
                <button 
                  className="action-btn-card delete"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredUsers.length === 0 && (
        <div className="empty-state-users">
          <p>No users found</p>
        </div>
      )}

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
                  onChange={(e) => setEditingUser({...editingUser, userName: e.target.value})}
                />
              </div>
              <div className="form-group-users">
                <label>Email</label>
                <input 
                  type="email" 
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                />
              </div>
              <div className="form-group-users">
                <label>Phone</label>
                <input 
                  type="tel" 
                  value={editingUser.phone}
                  onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                />
              </div>
              <div className="form-group-users">
                <label>Role</label>
                <select value={editingUser.role} onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}>
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="form-group-users">
                <label>Status</label>
                <select value={editingUser.status} onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-cancel-users" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-save-users" onClick={handleSaveUser}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAdmin;