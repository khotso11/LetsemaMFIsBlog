// Footer component with copyright information
const Footer = ({ className }) => {
    const currentYear = new Date().getFullYear()
    
    return (
      <footer className={`dashboard-footer ${className || ''}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-0">
                &copy; {currentYear} Letsema Microfinance Institution. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">
                <a href="#" className="text-white text-decoration-none me-3">Privacy Policy</a>
                <a href="#" className="text-white text-decoration-none">Terms of Service</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer