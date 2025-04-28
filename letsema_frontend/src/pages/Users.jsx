import { useEffect, useState } from 'react'
import { 
  FaSearch, 
  FaUserPlus, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaLock 
} from 'react-icons/fa'
import api from '../api/client'  // adjust path if needed

export default function Users() {
  const [users, setUsers]               = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState('')
  const [searchTerm, setSearchTerm]     = useState('')
  const [selectedRole, setSelectedRole] = useState('')

  // Fetch all staff & admin users (exclude borrowers)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/users/')
        // keep only loan_officer or admin
        const staffAndAdmin = data.filter(u => 
          u.role === 'loan_officer' || u.role === 'admin'
        )
        setUsers(staffAndAdmin)
      } catch (err) {
        console.error(err)
        setError(err.response?.data?.detail || 'Failed to load users.')
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  // Apply search & role filter
  useEffect(() => {
    const q = searchTerm.toLowerCase()
    setFilteredUsers(
      users.filter(u => {
        const matchesSearch =
          !q ||
          u.id.toString().includes(q) ||
          `${u.first_name} ${u.last_name}`.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)

        const matchesRole = 
          !selectedRole || u.role === selectedRole

        return matchesSearch && matchesRole
      })
    )
  }, [users, searchTerm, selectedRole])

  const handleViewDetails = (id) => {
    alert(`Viewing details for user ID: ${id}`)
  }
  const handleEdit = (id) => {
    alert(`Editing user ID: ${id}`)
  }
  const handleResetPassword = (id) => {
    alert(`Resetting password for user ID: ${id}`)
  }
  const handleDelete = (id) => {
    if (window.confirm(`Delete user ID ${id}?`)) {
      alert(`Deleted user ID: ${id}`)
    }
  }

  if (loading) return <p>Loading users…</p>
  if (error)   return <div className="alert alert-danger">{error}</div>

  return (
    <div className="users-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Management</h2>
        <button className="btn btn-primary">
          <FaUserPlus className="me-2" /> Add User
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><FaSearch /></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by ID, name, or email…"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={selectedRole}
                onChange={e => setSelectedRole(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="loan_officer">Loan Officer</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-header"><h5 className="mb-0">User List</h5></div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.first_name}</td>
                    <td>{u.last_name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge ${
                        u.role === 'admin' ? 'bg-danger' :
                        'bg-primary'
                      }`}>
                        {u.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => handleViewDetails(u.id)}
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary me-1"
                        onClick={() => handleEdit(u.id)}
                        title="Edit User"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-warning me-1"
                        onClick={() => handleResetPassword(u.id)}
                        title="Reset Password"
                      >
                        <FaLock />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(u.id)}
                        title="Delete User"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                {!filteredUsers.length && (
                  <tr><td colSpan="6" className="text-center py-3">No users found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
