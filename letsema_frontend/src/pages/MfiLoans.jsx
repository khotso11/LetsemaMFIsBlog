import { useEffect, useState } from 'react'
import api from '../api/loan'  // or '../api/client' if that’s your file

export default function MfiLoans() {
  const [loans, setLoans] = useState([])
  const [choices, setChoices] = useState({})     // { loanId: selectedStatus }
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch loans for this MFI
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const { data } = await api.get('/loans/')
        setLoans(data)
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to load loans.')
      } finally {
        setLoading(false)
      }
    }
    fetchLoans()
  }, [])

  // Track dropdown changes
  const handleSelect = (loanId, newStatus) => {
    setChoices(prev => ({ ...prev, [loanId]: newStatus }))
  }

  // Send patch to update status
  const handleUpdate = async (loanId) => {
    const newStatus = choices[loanId]
    if (!newStatus || newStatus === loans.find(l => l.id === loanId).status) {
      return  // no change
    }
    try {
      await api.patch(`/loans/${loanId}/`, { status: newStatus })
      // reflect change in UI
      setLoans(loans.map(l => 
        l.id === loanId ? { ...l, status: newStatus } : l
      ))
      // clear the choice so dropdown falls back to current status
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

  if (loading) return <p>Loading loans…</p>
  if (error)   return <div className="alert alert-danger">{error}</div>

  return (
    <div>
      <h2 className="mb-4">Review MFI Loans</h2>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>ID</th>
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
              return (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td>{loan.amount}</td>
                  <td>{loan.interest_rate}%</td>
                  <td>{loan.term_months} mo</td>
                  <td>
                    <span className={
                      current === 'pending'   ? 'badge bg-warning text-dark' :
                      current === 'approved'  ? 'badge bg-success' :
                                                 'badge bg-danger'
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
