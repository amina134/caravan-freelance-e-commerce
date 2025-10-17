import { useEffect, useState } from 'react';
import { Edit2, Trash2, Search, Plus } from 'lucide-react';
import styles from './customerAdmin.module.css';
import { deleteUser, fetchAllUsers, postUser, updateUser } from '../../../api/userApi';

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
    <div className={styles.adminUsers}>
      <div className={styles.adminUsers__header}>
        <div>
          <h1 className={styles.adminUsers__title}>Users Management</h1>
          <p className={styles.adminUsers__subtitle}>Manage all registered users</p>
        </div>
        <button
          className={styles.adminUsers__addBtn}
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} /> Add User
        </button>
      </div>

      {/* 🔍 Filters */}
      <div className={styles.adminUsers__filters}>
        <div className={styles.adminUsers__searchBox}>
          <Search size={18} className={styles.adminUsers__searchIcon} />
          <input
            type="text"
            placeholder="Search by name or email..."
            className={styles.adminUsers__searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.adminUsers__filtersGroup}>
          <select
            className={styles.adminUsers__select}
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
            className={styles.adminUsers__select}
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
      <div className={styles.adminUsers__tableWrapper}>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table className={styles.adminUsers__table}>
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
                    <span className={`${styles.adminUsers__roleBadge} ${styles[`role-${user.role}`]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td className={styles.adminUsers__actions}>
                    <button
                      className={`${styles.adminUsers__btn} ${styles.edit}`}
                      onClick={() => handleEditUser(user)}
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      className={`${styles.adminUsers__btn} ${styles.delete}`}
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ✏️ Edit Modal */}
      {showEditModal && editingUser && (
        <div
          className={styles.adminUsers__modalOverlay}
          onClick={() => setShowEditModal(false)}
        >
          <div
            className={styles.adminUsers__modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Edit User</h2>
            <div className={styles.adminUsers__form}>
              <label>
                Name
                <input
                  type="text"
                  value={editingUser.userName}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, userName: e.target.value })
                  }
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                />
              </label>
              <label>
                Phone
                <input
                  type="tel"
                  value={editingUser.phone}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, phone: e.target.value })
                  }
                />
              </label>
              <label>
                Role
                <select
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value })
                  }
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
            </div>
            <div className={styles.adminUsers__modalActions}>
              <button
                className={styles.adminUsers__cancelBtn}
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className={styles.adminUsers__saveBtn}
                onClick={handleSaveUser}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ➕ Add Modal */}
      {showAddModal && (
        <div
          className={styles.adminUsers__modalOverlay}
          onClick={() => setShowAddModal(false)}
        >
          <div
            className={styles.adminUsers__modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Add User</h2>
            <div className={styles.adminUsers__form}>
              <label>
                Name
                <input
                  type="text"
                  value={newUser.userName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, userName: e.target.value })
                  }
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </label>
              <label>
                Phone
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone: e.target.value })
                  }
                />
              </label>
              <label>
                Role
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
            </div>
            <div className={styles.adminUsers__modalActions}>
              <button
                className={styles.adminUsers__cancelBtn}
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className={styles.adminUsers__saveBtn}
                onClick={handleAddUser}
              >
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
