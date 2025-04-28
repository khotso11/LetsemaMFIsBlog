// import { FaPlus, FaSearch, FaFileExport } from 'react-icons/fa'

// // Loans page with loan management functionality
// const Loans = () => {
//   // Sample loan data
//   const loans = [
//     { id: 'L1001', borrower: 'John Smith', amount: 5000, status: 'Active', disbursed: '2023-03-15', due: '2023-09-15', balance: 3200 },
//     { id: 'L1002', borrower: 'Maria Johnson', amount: 2500, status: 'Active', disbursed: '2023-04-01', due: '2023-10-01', balance: 2100 },
//     { id: 'L1003', borrower: 'David Wilson', amount: 7500, status: 'Active', disbursed: '2023-02-20', due: '2023-08-20', balance: 3800 },
//     { id: 'L1004', borrower: 'Sarah Adams', amount: 1500, status: 'Pending', disbursed: '-', due: '-', balance: 1500 },
//     { id: 'L1005', borrower: 'Michael Brown', amount: 3000, status: 'Completed', disbursed: '2022-11-10', due: '2023-05-10', balance: 0 }
//   ]
  
//   return (
//     <div className="loans-page">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Loan Management</h2>
//         <div>
//           <button className="btn btn-primary">
//             <FaPlus className="me-2" />
//             New Loan
//           </button>
//         </div>
//       </div>
      
//       {/* Filters and Search */}
//       <div className="card mb-4">
//         <div className="card-body">
//           <div className="row g-3">
//             <div className="col-md-4">
//               <div className="input-group">
//                 <span className="input-group-text">
//                   <FaSearch />
//                 </span>
//                 <input 
//                   type="text" 
//                   className="form-control" 
//                   placeholder="Search loans..." 
//                 />
//               </div>
//             </div>
//             <div className="col-md-3">
//               <select className="form-select">
//                 <option value="">All Statuses</option>
//                 <option value="active">Active</option>
//                 <option value="pending">Pending</option>
//                 <option value="completed">Completed</option>
//                 <option value="defaulted">Defaulted</option>
//               </select>
//             </div>
//             <div className="col-md-3">
//               <select className="form-select">
//                 <option value="">All Loan Types</option>
//                 <option value="business">Business</option>
//                 <option value="personal">Personal</option>
//                 <option value="education">Education</option>
//                 <option value="agriculture">Agriculture</option>
//               </select>
//             </div>
//             <div className="col-md-2">
//               <button className="btn btn-secondary w-100">
//                 <FaFileExport className="me-2" />
//                 Export
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Loans Table */}
//       <div className="card">
//         <div className="card-header">
//           <h5 className="mb-0">Loans</h5>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-hover">
//               <thead>
//                 <tr>
//                   <th>Loan ID</th>
//                   <th>Borrower</th>
//                   <th>Amount</th>
//                   <th>Status</th>
//                   <th>Disbursed Date</th>
//                   <th>Due Date</th>
//                   <th>Balance</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loans.map((loan) => (
//                   <tr key={loan.id}>
//                     <td>{loan.id}</td>
//                     <td>{loan.borrower}</td>
//                     <td>LSL{loan.amount.toLocaleString()}</td>
//                     <td>
//                       <span className={`badge LSL{
//                         loan.status === 'Active' ? 'bg-success' : 
//                         loan.status === 'Pending' ? 'bg-warning' : 
//                         loan.status === 'Completed' ? 'bg-info' : 'bg-danger'
//                       }`}>
//                         {loan.status}
//                       </span>
//                     </td>
//                     <td>{loan.disbursed}</td>
//                     <td>{loan.due}</td>
//                     <td>LSL{loan.balance.toLocaleString()}</td>
//                     <td>
//                       <button className="btn btn-sm btn-outline-primary me-1">View</button>
//                       <button className="btn btn-sm btn-outline-secondary">Edit</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <div className="card-footer">
//           <nav>
//             <ul className="pagination justify-content-center mb-0">
//               <li className="page-item disabled">
//                 <a className="page-link" href="#" tabIndex="-1">Previous</a>
//               </li>
//               <li className="page-item active">
//                 <a className="page-link" href="#">1</a>
//               </li>
//               <li className="page-item">
//                 <a className="page-link" href="#">2</a>
//               </li>
//               <li className="page-item">
//                 <a className="page-link" href="#">3</a>
//               </li>
//               <li className="page-item">
//                 <a className="page-link" href="#">Next</a>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Loans



import { useEffect, useState } from 'react'
import api from '../api/loan'  // or '../api/client' if that’s your file

export default function Loans() {
  const [loans, setLoans]     = useState([])
  const [choices, setChoices] = useState({})     // { loanId: selectedStatus }
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  // 1) Fetch only approved loans (with borrower_details)
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const { data } = await api.get('/loans/', {
          params: { status: 'approved' }
        })
        setLoans(data)
      } catch (err) {
        console.error(err)
        setError(err.response?.data?.detail || 'Failed to load loans.')
      } finally {
        setLoading(false)
      }
    }
    fetchLoans()
  }, [])

  // 2) Track dropdown changes
  const handleSelect = (loanId, newStatus) => {
    setChoices(prev => ({ ...prev, [loanId]: newStatus }))
  }

  // 3) Send patch to update status
  const handleUpdate = async (loanId) => {
    const newStatus = choices[loanId]
    const current = loans.find(l => l.id === loanId).status
    if (!newStatus || newStatus === current) return

    try {
      await api.patch(`/loans/${loanId}/`, { status: newStatus })
      setLoans(loans.map(l =>
        l.id === loanId ? { ...l, status: newStatus } : l
      ))
      setChoices(prev => {
        const nxt = { ...prev }
        delete nxt[loanId]
        return nxt
      })
    } catch (err) {
      console.error('Could not update status:', err)
      alert('Failed to update loan status.')
    }
  }

  if (loading) return <p>Loading approved loans…</p>
  if (error)   return <div className="alert alert-danger">{error}</div>

  return (
    <div>
      <h2 className="mb-4">Approved Loans</h2>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Borrower Name</th>
              <th>Borrower Email</th>
              <th>Amount</th>
              <th>Interest Rate</th>
              <th>Term</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map(loan => {
              const current = loan.status
              const selected = choices[loan.id] ?? current

              // use the nested borrower_details serializer field
              const b = loan.borrower_details || {}
              const fullName = b.first_name
                ? `${b.first_name} ${b.last_name}`.trim()
                : '—'

              return (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td>{fullName}</td>
                  <td>{b.email || '—'}</td>
                  <td>{loan.amount}</td>
                  <td>{loan.interest_rate}%</td>
                  <td>{loan.term_months} mo</td>
                  <td>
                    <span className={
                      current === 'approved'
                        ? 'badge bg-success'
                        : current === 'pending'
                        ? 'badge bg-warning text-dark'
                        : 'badge bg-danger'
                    }>
                      {current}
                    </span>
                  </td>
                  <td className="d-flex align-items-center">
                    <select
                      className="form-select form-select-sm me-2"
                      style={{ width: '120px' }}
                      value={selected}
                      onChange={e => handleSelect(loan.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button
                      className="btn btn-sm btn-primary"
                      disabled={selected === current}
                      onClick={() => handleUpdate(loan.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

