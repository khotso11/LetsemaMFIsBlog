// import { useEffect, useState } from 'react'
// import api from '../api/loan'  // or '../api/client', whichever you use

// export default function ViewLoans() {
//   const [loans, setLoans]     = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError]     = useState('')

//   // Grab the logged-in user from localStorage
//   const stored = localStorage.getItem('user')
//   const user   = stored ? JSON.parse(stored) : null

//   useEffect(() => {
//     const fetchLoans = async () => {
//       if (!user) {
//         setError('Please log in to view your loans.')
//         setLoading(false)
//         return
//       }

//       try {
//         const response = await api.get('/loans/')
//         // Only keep loans where borrower.id === current user.id
//         const myLoans = response.data.filter(
//           loan => loan.borrower === user.id
//         )
//         setLoans(myLoans)
//       } catch (err) {
//         console.error('Error fetching loans:', err)
//         setError(
//           err.response?.data?.detail ||
//           'Unable to load your loans.'
//         )
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchLoans()
//   }, [user])

//   if (loading) return <p>Loading your loans…</p>
//   if (error)   return <div className="alert alert-danger">{error}</div>
//   if (!user)  return <p>Please log in.</p>
//   if (!loans.length) return <p>You have no loans.</p>

//   return (
//     <div className="table-responsive">
//       <h2 className="mb-4">My Loans</h2>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Amount</th>
//             <th>Interest Rate (%)</th>
//             <th>Term (months)</th>
//             <th>Status</th>
//             <th>National ID Doc</th>
//             <th>Proof of Payment</th>
//           </tr>
//         </thead>
//         <tbody>
//           {loans.map(loan => (
//             <tr key={loan.id}>
//               <td>{loan.amount}</td>
//               <td>{loan.interest_rate}</td>
//               <td>{loan.term_months}</td>
//               <td>{loan.status}</td>
//               <td>
//                 {loan.national_id_document
//                   ? (
//                     <a
//                       href={loan.national_id_document}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       Download
//                     </a>
//                   )
//                   : '—'
//                 }
//               </td>
//               <td>
//                 {loan.proof_of_payment
//                   ? (
//                     <a
//                       href={loan.proof_of_payment}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       Download
//                     </a>
//                   )
//                   : '—'
//                 }
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }



import { useEffect, useState } from 'react'
import { FaSearch, FaEye, FaFileAlt, FaMoneyBillWave } from 'react-icons/fa'
import api from '../api/loan'

export default function ViewLoans() {
  const [loans, setLoans]             = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState('')
  const [search, setSearch]           = useState('')
  const [selectedStatus, setSelectedStatus]   = useState('')
  const [selectedPurpose, setSelectedPurpose] = useState('')

  const user = JSON.parse(localStorage.getItem('user') || 'null')

  useEffect(() => {
    if (!user) {
      setError('Please log in to view your loans.')
      setLoading(false)
      return
    }
    ;(async () => {
      try {
        const { data } = await api.get('loans/', {
          params: { borrower: user.id }
        })
        setLoans(data)
      } catch (err) {
        console.error(err)
        setError(err.response?.data?.detail || 'Unable to load your loans.')
      } finally {
        setLoading(false)
      }
    })()
  }, [user])

  const filteredLoans = loans.filter(loan => {
    return (
      (!selectedStatus || loan.status.toLowerCase() === selectedStatus.toLowerCase()) &&
      (!selectedPurpose || (loan.purpose || '').toLowerCase() === selectedPurpose.toLowerCase()) &&
      (!search ||
        loan.id.toString().includes(search) ||
        (loan.purpose || '').toLowerCase().includes(search.toLowerCase())
      )
    )
  })

  if (loading) return <p>Loading your loans…</p>
  if (error)   return <div className="alert alert-danger">{error}</div>
  if (!loans.length) return <p>You have no loans.</p>

  return (
    <div className="view-loans-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Loans</h2>
        <button
          className="btn btn-primary"
          onClick={() => window.location.href = '/apply-loan'}
        >
          <FaMoneyBillWave className="me-2" />
          Apply for New Loan
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text"><FaSearch /></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search loans..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="disbursed">Disbursed</option>
                <option value="repaid">Repaid</option>
              </select>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={selectedPurpose}
                onChange={e => setSelectedPurpose(e.target.value)}
              >
                <option value="">All Purposes</option>
                <option value="business">Business</option>
                <option value="education">Education</option>
                <option value="personal">Personal</option>
                <option value="home improvement">Home Improvement</option>
                <option value="agriculture">Agriculture</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Loan History</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Loan ID</th>
                  <th>Amount</th>
                  <th>Purpose</th>
                  <th>Term</th>
                  <th>Status</th>
                  <th>Paid / Remaining</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.map(loan => (
                  <tr key={loan.id}>
                    <td>{loan.id}</td>
                    <td>LSL{loan.amount.toLocaleString()}</td>
                    <td>{loan.purpose}</td>
                    <td>{loan.term_months} mo</td>
                    <td>
                      <span className={`badge ${
                        loan.status === 'approved' ? 'bg-success' :
                        loan.status === 'pending'  ? 'bg-warning text-dark' :
                        loan.status === 'rejected' ? 'bg-danger' :
                        'bg-secondary'
                      }`}>
                        {loan.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="progress flex-grow-1 me-2" style={{ height: '8px' }}>
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: `${(loan.total_repaid / loan.amount) * 100}%` }}
                            aria-valuenow={(loan.total_repaid / loan.amount) * 100}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <span className="small">
                          LSL{loan.total_repaid} / LSL{loan.amount}
                        </span>
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => alert(`Viewing details for ${loan.id}`)}
                      >
                        <FaEye className="me-1" /> View
                      </button>
                      {loan.status === 'approved' && (
                        <button className="btn btn-sm btn-outline-success">
                          <FaFileAlt className="me-1" /> Pay
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <p className="mb-0">Showing {filteredLoans.length} loans</p>
        </div>
      </div>
    </div>
  )
}
