import { useState } from 'react'
import { FaSearch, FaUserPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa'

const MyBorrowers = () => {
  const [selectedStatus, setSelectedStatus] = useState('')
  
  // Sample borrower data
  const borrowers = [
    { 
      id: 'B1001', 
      name: 'John Smith', 
      phone: '(555) 123-4567', 
      email: 'john.smith@example.com', 
      address: '123 Main St, Anytown, USA',
      occupation: 'Small Business Owner',
      loans: 2, 
      totalBorrowed: 7500,
      status: 'Active' 
    },
    { 
      id: 'B1002', 
      name: 'Maria Johnson', 
      phone: '(555) 234-5678', 
      email: 'maria.j@example.com', 
      address: '456 Oak Ave, Somewhere, USA',
      occupation: 'Teacher',
      loans: 1, 
      totalBorrowed: 2500,
      status: 'Active' 
    },
    { 
      id: 'B1003', 
      name: 'David Wilson', 
      phone: '(555) 345-6789', 
      email: 'david.w@example.com', 
      address: '789 Pine Rd, Nowhere, USA',
      occupation: 'Farmer',
      loans: 1, 
      totalBorrowed: 7500,
      status: 'Active' 
    },
    { 
      id: 'B1004', 
      name: 'Sarah Adams', 
      phone: '(555) 456-7890', 
      email: 'sarah.a@example.com', 
      address: '101 Elm St, Anyplace, USA',
      occupation: 'Student',
      loans: 0, 
      totalBorrowed: 0,
      status: 'Pending' 
    },
    { 
      id: 'B1005', 
      name: 'Michael Brown', 
      phone: '(555) 567-8901', 
      email: 'michael.b@example.com', 
      address: '202 Maple Dr, Somewhere, USA',
      occupation: 'Shopkeeper',
      loans: 3, 
      totalBorrowed: 4500,
      status: 'Inactive' 
    }
  ]
  
  const filteredBorrowers = selectedStatus 
    ? borrowers.filter(borrower => borrower.status.toLowerCase() === selectedStatus.toLowerCase())
    : borrowers
  
  const handleViewDetails = (borrowerId) => {
    alert(`Viewing details for borrower ID: ${borrowerId}`)
    // Here you would typically navigate to a borrower details page
  }
  
  const handleEdit = (borrowerId) => {
    alert(`Editing borrower ID: ${borrowerId}`)
    // Here you would typically open a modal or navigate to an edit page
  }
  
  const handleDelete = (borrowerId) => {
    if (confirm(`Are you sure you want to delete borrower ID: ${borrowerId}?`)) {
      alert(`Deleted borrower ID: ${borrowerId}`)
      // Here you would typically call your API to delete the borrower
    }
  }
  
  return (
    <div className="my-borrowers-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Borrowers</h2>
        <div>
          <button className="btn btn-primary">
            <FaUserPlus className="me-2" />
            Add Borrower
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search borrowers by name, ID, or contact..." 
                />
              </div>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select">
                <option value="">All Loan Counts</option>
                <option value="0">No Loans</option>
                <option value="1">1 Loan</option>
                <option value="multiple">Multiple Loans</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Borrowers Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Borrower List</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Borrower ID</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Occupation</th>
                  <th>Active Loans</th>
                  <th>Total Borrowed</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBorrowers.map((borrower) => (
                  <tr key={borrower.id}>
                    <td>{borrower.id}</td>
                    <td>{borrower.name}</td>
                    <td>
                      <div>{borrower.phone}</div>
                      <div className="small text-muted">{borrower.email}</div>
                    </td>
                    <td>{borrower.occupation}</td>
                    <td>{borrower.loans}</td>
                    <td>${borrower.totalBorrowed.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${
                        borrower.status === 'Active' ? 'bg-success' : 
                        borrower.status === 'Pending' ? 'bg-warning' : 'bg-secondary'
                      }`}>
                        {borrower.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-primary me-1" 
                        onClick={() => handleViewDetails(borrower.id)}
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-secondary me-1"
                        onClick={() => handleEdit(borrower.id)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(borrower.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0">Showing {filteredBorrowers.length} borrowers</p>
            </div>
            <div className="col-md-6">
              <nav>
                <ul className="pagination justify-content-end mb-0">
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
                    <a className="page-link" href="#">Next</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyBorrowers