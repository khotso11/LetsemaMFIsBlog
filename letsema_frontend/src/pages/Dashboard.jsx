import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import api from '../api/client'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      setUser(JSON.parse(stored))
    } else {
      localStorage.clear()
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  if (!user) return <p>Loading...</p>

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="flex-shrink-0 p-3 bg-light" style={{ width: '250px', height: '100vh' }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <span className="fs-4">Dashboard</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink to="/apply-loan" className="nav-link link-dark">
              Apply Loans
            </NavLink>
          </li>
          <li>
            <NavLink to="/repayments" className="nav-link link-dark">
              Repayments
            </NavLink>
          </li>
          <li>
            <NavLink to="/view-loans" className="nav-link link-dark">
              View Loans
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-borrowers" className="nav-link link-dark">
              My Borrowers
            </NavLink>
          </li>
          <li>
            <NavLink to="/loans" className="nav-link link-dark">
              Loans
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className="nav-link link-dark">
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className="nav-link link-dark">
              Profile
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout} className="btn btn-link link-dark text-start">
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h1>Welcome, {user.first_name}!</h1>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  )
}
