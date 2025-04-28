// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import api from '../api/loan'     // baseURL = http://…:8000/api

// export default function Repayments() {
//   const [loans, setLoans]         = useState([])
//   const [form, setForm]           = useState({})   // { [loanId]: amount }
//   const [errors, setErrors]       = useState({})   // { [loanId]: errorMsg }
//   const [successes, setSuccesses] = useState({})   // { [loanId]: successMsg }
//   const [loading, setLoading]     = useState(true)
//   const [globalError, setGlobalError] = useState('')

//   const navigate = useNavigate()
//   const user     = JSON.parse(localStorage.getItem('user') || '{}')

//   useEffect(() => {
//     if (!user.id) {
//       navigate('/login')
//       return
//     }
//     if (!['loan_officer','admin'].includes(user.role)) {
//       setGlobalError('You do not have permission to record repayments.')
//       setLoading(false)
//       return
//     }

//     ;(async () => {
//       try {
//         const { data } = await api.get('loans/', { params: { status: 'approved' } })
//         setLoans(data)
//       } catch (err) {
//         console.error(err)
//         setGlobalError('Unable to load approved loans for your MFI.')
//       } finally {
//         setLoading(false)
//       }
//     })()
//   }, [navigate, user.id, user.role])

//   const handleChange = e => {
//     const { name, value } = e.target
//     setForm(prev => ({ ...prev, [name]: value }))
//     setErrors(prev => ({ ...prev, [name]: '' }))
//     setSuccesses(prev => ({ ...prev, [name]: '' }))
//   }

//   const handleSubmit = async (e, loanId) => {
//     e.preventDefault()
//     const amount = parseFloat(form[loanId])
//     if (!amount || amount <= 0) {
//       setErrors(prev => ({ ...prev, [loanId]: 'Enter a valid amount.' }))
//       return
//     }

//     // log exactly what endpoint we're hitting
//     console.log(
//       'POSTing to',
//       api.defaults.baseURL + '/loans/repayments/',
//       { loan: loanId, amount_paid: amount }
//     )

//     try {
//       // note: no leading slash here
//       await api.post('loans/repayments/', {
//         loan: loanId,
//         amount_paid: amount
//       })

//       // refresh list
//       const { data } = await api.get('loans/', { params: { status: 'approved' } })
//       setLoans(data)

//       setSuccesses(prev => ({ ...prev, [loanId]: 'Repayment recorded.' }))
//       setForm(prev => ({ ...prev, [loanId]: '' }))
//     } catch (err) {
//       console.error(err)
//       setErrors(prev => ({
//         ...prev,
//         [loanId]: err.response?.data?.detail || 'Failed to record repayment.'
//       }))
//     }
//   }

//   if (loading) return <p>Loading…</p>
//   if (globalError) return <div className="alert alert-danger">{globalError}</div>
//   if (!loans.length) return <p>No approved loans found.</p>

//   return (
//     <div>
//       <h2 className="mb-4">Record Repayments</h2>
//       {loans.map(loan => (
//         <form
//           key={loan.id}
//           onSubmit={e => handleSubmit(e, loan.id)}
//           className="card mb-3"
//         >
//           <div className="card-body">
//             <h5 className="card-title">
//               Loan #{loan.id}: {loan.amount} @ {loan.interest_rate}% for {loan.term_months} mo
//             </h5>
//             <p className="card-text">
//               <strong>Total Repaid:</strong> {loan.total_repaid}
//             </p>
//             <p className="card-text">
//               <strong>Remaining Balance:</strong> {loan.remaining_balance}
//             </p>

//             <div className="row gx-2 align-items-end">
//               <div className="col-auto">
//                 <label htmlFor={`amount-${loan.id}`} className="form-label">
//                   Amount to record
//                 </label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   id={`amount-${loan.id}`}
//                   name={`${loan.id}`}
//                   className="form-control"
//                   value={form[loan.id] || ''}
//                   onChange={handleChange}
//                 />
//                 {errors[loan.id] && (
//                   <div className="text-danger small">{errors[loan.id]}</div>
//                 )}
//                 {successes[loan.id] && (
//                   <div className="text-success small">{successes[loan.id]}</div>
//                 )}
//               </div>
//               <div className="col-auto">
//                 <button type="submit" className="btn btn-primary">
//                   Record
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       ))}
//     </div>
//   )
// }


// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import {
//   FaSearch,
//   FaFileInvoiceDollar,
//   FaCalendarAlt,
//   FaMoneyBillWave
// } from 'react-icons/fa'
// import api from '../api/loan'   // baseURL = http://<host>:8000/api

// export default function Repayments() {
//   const [loans, setLoans]               = useState([])
//   const [repayments, setRepayments]     = useState([])
//   const [selectedLoan, setSelectedLoan] = useState('')
//   const [search, setSearch]             = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [loading, setLoading]           = useState(true)
//   const [error, setError]               = useState('')
//   const navigate = useNavigate()
//   const user     = JSON.parse(localStorage.getItem('user') || 'null')

//   // 1) Load borrower's loans on mount
//   useEffect(() => {
//     if (!user) {
//       setError('Please log in.')
//       setLoading(false)
//       return
//     }
//     ;(async () => {
//       try {
//         const { data } = await api.get('loans/', {
//           params: { borrower: user.id }
//         })
//         setLoans(data)
//         if (data.length) setSelectedLoan(data[0].id)
//       } catch (err) {
//         console.error(err)
//         setError(err.response?.data?.detail || 'Failed to load loans.')
//       } finally {
//         setLoading(false)
//       }
//     })()
//   }, [user])

//   // 2) Fetch repayments when selectedLoan changes
//   useEffect(() => {
//     if (!selectedLoan) return
//     setLoading(true)
//     ;(async () => {
//       try {
//         const { data } = await api.get('repayments/repayments/', {
//           params: { loan: selectedLoan }
//         })
//         setRepayments(data)
//       } catch (err) {
//         console.error(err)
//         setError(err.response?.data?.detail || 'Failed to load repayments.')
//       } finally {
//         setLoading(false)
//       }
//     })()
//   }, [selectedLoan])

//   // 3) Handle manual payment recording (by loan officer/admin)
//   const handleMakePayment = async (repayment) => {
//     try {
//       await api.post('loans/repayments/', {
//         loan: selectedLoan,
//         amount_paid: repayment.amount_paid
//       })
//       // refresh repayments
//       const { data } = await api.get('loans/repayments/', {
//         params: { loan: selectedLoan }
//       })
//       setRepayments(data)
//       alert(`Payment of $${repayment.amount_paid} recorded.`)
//     } catch (err) {
//       console.error(err)
//       alert('Failed to record payment.')
//     }
//   }

//   // 4) Filtered list
//   const filtered = repayments.filter(r => {
//     const matchesSearch =
//       !search ||
//       r.id.toLowerCase().includes(search.toLowerCase()) ||
//       r.loan.toString() === search
//     const matchesStatus =
//       !statusFilter || r.status.toLowerCase() === statusFilter
//     return matchesSearch && matchesStatus
//   })

//   if (loading) return <p>Loading…</p>
//   if (error)   return <div className="alert alert-danger">{error}</div>
//   if (!loans.length) return <p>You have no loans.</p>

//   return (
//     <div className="repayments-page">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Loan Repayments</h2>
//         <button
//           className="btn btn-primary"
//           onClick={() => navigate('/apply-loan')}
//         >
//           <FaMoneyBillWave className="me-2" />
//           Apply for New Loan
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="card mb-4">
//         <div className="card-body">
//           <div className="row g-3">
//             <div className="col-md-4">
//               <div className="input-group">
//                 <span className="input-group-text"><FaSearch /></span>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Search repayments..."
//                   value={search}
//                   onChange={e => setSearch(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="col-md-4">
//               <select
//                 className="form-select"
//                 value={selectedLoan}
//                 onChange={e => setSelectedLoan(e.target.value)}
//               >
//                 <option value="">All Loans</option>
//                 {loans.map(loan => (
//                   <option key={loan.id} value={loan.id}>
//                     {loan.id} – ${loan.amount.toLocaleString()}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-md-4">
//               <select
//                 className="form-select"
//                 value={statusFilter}
//                 onChange={e => setStatusFilter(e.target.value)}
//               >
//                 <option value="">All Statuses</option>
//                 <option value="paid">Paid</option>
//                 <option value="due">Due</option>
//                 <option value="overdue">Overdue</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Repayments Table */}
//       <div className="card">
//         <div className="card-header">
//           <h5 className="mb-0">Repayment Schedule</h5>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-hover">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Amount</th>
//                   <th>Due Date</th>
//                   <th>Status</th>
//                   <th>Paid Date</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map(r => (
//                   <tr key={r.id}>
//                     <td>{r.id}</td>
//                     <td>${r.amount_paid.toLocaleString()}</td>
//                     <td>{new Date(r.payment_date).toLocaleDateString()}</td>
//                     <td>
//                       <span className={`badge ${
//                         r.status === 'paid'    ? 'bg-success' :
//                         r.status === 'due'     ? 'bg-warning text-dark' :
//                                                  'bg-danger'
//                       }`}>
//                         {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
//                       </span>
//                     </td>
//                     <td>
//                       {r.paid_date
//                         ? new Date(r.paid_date).toLocaleDateString()
//                         : '-'}
//                     </td>
//                     <td>
//                       {r.status !== 'paid' ? (
//                         <button
//                           className="btn btn-sm btn-outline-primary"
//                           onClick={() => handleMakePayment(r)}
//                         >
//                           <FaFileInvoiceDollar className="me-1" />
//                           Pay Now
//                         </button>
//                       ) : (
//                         <button className="btn btn-sm btn-outline-secondary">
//                           Receipt
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <div className="card-footer">
//           <p className="mb-0">Showing {filtered.length} repayments</p>
//         </div>
//       </div>
//     </div>
//   )
// }





import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaSearch,
  FaFileInvoiceDollar,
  FaMoneyBillWave
} from 'react-icons/fa'
import api from '../api/loan'   // baseURL = http://<host>:8000/api

export default function Repayments() {
  const [loans, setLoans]               = useState([])
  const [repayments, setRepayments]     = useState([])
  const [selectedLoan, setSelectedLoan] = useState('')
  const [search, setSearch]             = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState('')
  const navigate = useNavigate()
  const user     = JSON.parse(localStorage.getItem('user') || 'null')

  // Load borrower's loans
  useEffect(() => {
    if (!user) {
      setError('Please log in.')
      setLoading(false)
      return
    }
    ;(async () => {
      try {
        const { data } = await api.get('loans/', {
          params: { borrower: user.id }
        })
        setLoans(data)
        if (data.length) setSelectedLoan(data[0].id)
      } catch (err) {
        console.error(err)
        setError(err.response?.data?.detail || 'Failed to load loans.')
      } finally {
        setLoading(false)
      }
    })()
  }, [user])

  // Fetch repayments when loan changes
  useEffect(() => {
    if (!selectedLoan) return
    setLoading(true)
    ;(async () => {
      try {
        const { data } = await api.get('repayments/repayments/', {
          params: { loan: selectedLoan }
        })
        setRepayments(data)
      } catch (err) {
        console.error(err)
        setError(err.response?.data?.detail || 'Failed to load repayments.')
      } finally {
        setLoading(false)
      }
    })()
  }, [selectedLoan])

  // Make manual payment
  const handleMakePayment = async (r) => {
    try {
      await api.post('repayments/repayments/', {
        loan_id: selectedLoan,
        amount_paid: r.amount_paid
      })
      const { data } = await api.get('repayments/repayments/', {
        params: { loan: selectedLoan }
      })
      setRepayments(data)
      alert(`Payment of $${r.amount_paid} recorded.`)
    } catch (err) {
      console.error(err)
      alert('Failed to record payment.')
    }
  }

  // Filter
  const filtered = repayments.filter(r => {
    const matchesSearch =
      !search ||
      r.id.toString().includes(search) ||
      r.loan_id.toString() === search
    const matchesStatus =
      !statusFilter ||
      (r.status && r.status.toLowerCase() === statusFilter)
    return matchesSearch && matchesStatus
  })

  if (loading) return <p>Loading…</p>
  if (error)   return <div className="alert alert-danger">{error}</div>
  if (!loans.length) return <p>You have no loans.</p>

  return (
    <div className="repayments-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Loan Repayments</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/apply-loan')}
        >
          <FaMoneyBillWave className="me-2" />
          Apply for New Loan
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text"><FaSearch /></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search repayments..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={selectedLoan}
                onChange={e => setSelectedLoan(e.target.value)}
              >
                <option value="">All Loans</option>
                {loans.map(loan => (
                  <option key={loan.id} value={loan.id}>
                    {loan.id} – ${loan.amount.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="due">Due</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header"><h5 className="mb-0">Repayment Schedule</h5></div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Payment Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>${r.amount_paid.toLocaleString()}</td>
                    <td>{new Date(r.payment_date).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${
                        r.status === 'paid'   ? 'bg-success' :
                        r.status === 'due'    ? 'bg-warning text-dark' :
                                                'bg-danger'
                      }`}>
                        {r.status
                          ? r.status.charAt(0).toUpperCase() + r.status.slice(1)
                          : '—'
                        }
                      </span>
                    </td>
                    <td>
                      {r.status !== 'paid' ? (
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleMakePayment(r)}
                        >
                          <FaFileInvoiceDollar className="me-1" />
                          Pay Now
                        </button>
                      ) : (
                        <button className="btn btn-sm btn-outline-secondary">
                          Receipt
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {!filtered.length && (
                  <tr>
                    <td colSpan="5" className="text-center py-3">No repayments found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer text-end">
          Showing {filtered.length} repayments
        </div>
      </div>
    </div>
  )
}
