import { useState } from 'react'
import { FaBars, FaUserCircle, FaBell, FaSignOutAlt, FaUserCog } from 'react-icons/fa'

// Header component with institution name and user menu
const Header = ({ toggleSidebar, user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  
  return (
    <header className="dashboard-header">
      <div className="container-fluid">
        <div className="row align-items-center" style={{ height: '60px' }}>
          <div className="col-auto">
            <button 
              className="btn btn-link text-dark" 
              onClick={toggleSidebar}
            >
              <FaBars />
            </button>
          </div>
          
          <div className="col">
            <h5 className="m-0">Letsema</h5>
          </div>
          
          <div className="col-auto">
            <div className="d-flex align-items-center">
              {/* Notifications */}
              <div className="me-3 position-relative">
                <button className="btn btn-link text-dark">
                  <FaBell />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    3
                  </span>
                </button>
              </div>
              
              {/* User dropdown */}
              <div className="dropdown">
                <button 
                  className="btn btn-link text-dark dropdown-toggle d-flex align-items-center"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                >
                  <FaUserCircle className="me-2" size={24} />
                  <span>{user?.first_name || 'Admin'}</span>
                </button>
                
                {dropdownOpen && (
                  <ul className="dropdown-menu dropdown-menu-end show">
                    <li>
                      <a className="dropdown-item" href="/profile">
                        <FaUserCog className="me-2" />
                        Profile
                      </a>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <a className="dropdown-item" href="#" onClick={() => {
                        localStorage.clear();
                        window.location.href = '/login';
                      }}>
                        <FaSignOutAlt className="me-2" />
                        Sign Out
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header