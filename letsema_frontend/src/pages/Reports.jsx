import { useState } from 'react'
import { FaDownload, FaFilter, FaCalendarAlt } from 'react-icons/fa'

// Reports page with tables and filters
const Reports = () => {
  const [reportType, setReportType] = useState('loan')
  
  // Sample report data
  const loanReports = [
    { id: 1, name: 'Loan Disbursement Report', date: '2023-04-15', status: 'Available' },
    { id: 2, name: 'Loan Repayment Schedule', date: '2023-04-10', status: 'Available' },
    { id: 3, name: 'Delinquency Report', date: '2023-04-05', status: 'Available' },
    { id: 4, name: 'Portfolio at Risk Report', date: '2023-03-31', status: 'Available' },
    { id: 5, name: 'Loan Officer Performance', date: '2023-03-25', status: 'Available' }
  ]
  
  const borrowerReports = [
    { id: 1, name: 'Borrower Demographics', date: '2023-04-12', status: 'Available' },
    { id: 2, name: 'Borrower Activity Summary', date: '2023-04-08', status: 'Available' },
    { id: 3, name: 'New Borrower Registration', date: '2023-04-01', status: 'Available' },
    { id: 4, name: 'Borrower Credit History', date: '2023-03-28', status: 'Available' }
  ]
  
  const reports = reportType === 'loan' ? loanReports : borrowerReports
  
  return (
    <div className="reports-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Reports</h2>
        <div>
          <button className="btn btn-primary me-2">
            <FaDownload className="me-2" />
            Export
          </button>
          <button className="btn btn-secondary">
            <FaFilter className="me-2" />
            Filter
          </button>
        </div>
      </div>
      
      {/* Report Type Selector */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-4">
              <label className="form-label">Report Type</label>
              <select 
                className="form-select" 
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="loan">Loan Reports</option>
                <option value="borrower">Borrower Reports</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Date Range</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaCalendarAlt />
                </span>
                <input type="date" className="form-control" />
                <span className="input-group-text">to</span>
                <input type="date" className="form-control" />
              </div>
            </div>
            <div className="col-md-4">
              <label className="form-label">Branch</label>
              <select className="form-select">
                <option value="all">All Branches</option>
                <option value="main">Main Branch</option>
                <option value="north">North Branch</option>
                <option value="east">East Branch</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reports Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">{reportType === 'loan' ? 'Loan Reports' : 'Borrower Reports'}</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Date Generated</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.name}</td>
                    <td>{report.date}</td>
                    <td>
                      <span className="badge bg-success">{report.status}</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">
                        <FaDownload className="me-1" /> Download
                      </button>
                      <button className="btn btn-sm btn-outline-secondary">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <nav>
            <ul className="pagination justify-content-center mb-0">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1">Previous</a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">1</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">2</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">3</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Reports