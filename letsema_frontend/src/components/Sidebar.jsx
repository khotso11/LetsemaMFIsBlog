import { NavLink } from 'react-router-dom'
import { 
  FaHome, 
  FaMoneyBillWave, 
  FaFileInvoiceDollar, 
  FaUsers, 
  FaUserCircle, 
  FaSignOutAlt,
  FaHandHoldingUsd
} from 'react-icons/fa'

// Full list of possible nav items
const ALL_NAV_ITEMS = [
  { path: '/',           name: 'Dashboard',    icon: <FaHome /> },
  { path: '/apply-loan',  name: 'Apply Loans',  icon: <FaHandHoldingUsd /> },
  { path: '/repayments',  name: 'Repayments',   icon: <FaFileInvoiceDollar /> },
  { path: '/view-loans',  name: 'View Loans',   icon: <FaMoneyBillWave /> },
  { path: '/borrowers',name: 'My Borrowers', icon: <FaUsers /> },
  { path: '/loans',       name: 'Loans',        icon: <FaMoneyBillWave /> },
  { path: '/users',       name: 'Users',        icon: <FaUsers /> },
  { path: '/my-repayments',  name: 'My Repayments',   icon: <FaFileInvoiceDollar /> },
  { path: '/profile',     name: 'Profile',      icon: <FaUserCircle /> }
]

const Sidebar = ({ isOpen, onLogout }) => {
  // get user & role
  const raw = localStorage.getItem('user')
  const user = raw ? JSON.parse(raw) : null
  const role = user?.role

  // define which paths each role may see
  const borrowerPaths = new Set([
    '/apply-loan',
    '/my-repayments',
    '/view-loans',
    '/profile'
  ])
  const adminPaths = new Set([
    '/',           // Dashboard
    '/borrowers',
    '/loans',
    '/repayments',
    '/users',
    '/profile'
  ])

  // pick the right subset
  let navItems = []
  if (role === 'borrower') {
    navItems = ALL_NAV_ITEMS.filter(item => borrowerPaths.has(item.path))
  } else if (role === 'admin' || role === 'loan_officer') {
    // admins and loan officers
    navItems = ALL_NAV_ITEMS.filter(item => adminPaths.has(item.path))
  }

  return (
    <div className={`sidebar ${isOpen ? 'show' : ''}`}>
      <div className="sidebar-header">
        <h3 className="m-0">MicroFinance</h3>
      </div>
      <div className="sidebar-menu">
        <ul className="nav flex-column">
          {navItems.map(item => (
            <li className="nav-item" key={item.path}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => 
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="me-2">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
          <li className="nav-item">
            <button 
              onClick={onLogout} 
              className="sidebar-link w-100 text-start border-0 bg-transparent"
            >
              <span className="me-2"><FaSignOutAlt /></span>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
