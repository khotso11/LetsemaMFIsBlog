import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Footer from '../components/Footer'

// Main layout component that organizes the dashboard structure
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  
  useEffect(() => {
    // Check if user is logged in
    const stored = localStorage.getItem('user')
    if (stored) {
      setUser(JSON.parse(stored))
    } else {
      // Redirect to login if no user found
      navigate('/login')
    }
  }, [navigate])
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  
  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }
  
  if (!user) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  }
  
  return (
    <div className="dashboard-container">
      {/* Sidebar component with navigation */}
      <Sidebar isOpen={sidebarOpen} onLogout={handleLogout} />
      
      <div className={`content-wrapper ${sidebarOpen ? '' : 'sidebar-closed'}`}>
        {/* Header with institution name and user menu */}
        <Header toggleSidebar={toggleSidebar} user={user} />
        
        {/* Main content area where page components render */}
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="container-fluid">
            <Outlet context={user} />
          </div>
        </main>
        
        {/* Footer with copyright information */}
        <Footer className={sidebarOpen ? 'sidebar-open' : ''} />
      </div>
    </div>
  )
}

export default DashboardLayout