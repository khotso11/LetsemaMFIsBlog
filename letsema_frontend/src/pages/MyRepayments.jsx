import { useEffect, useState } from 'react'
import api from '../api/loan'  // or '../api/client'

export default function MyRepayments() {
  const [loans, setLoans] = useState([])
  const [amounts, setAmounts] = useState({})
  const [errors, setErrors] = useState({})
  const [successes, setSuccesses] = useState({})
  const [loading, setLoading] = useState(true)
  const [globalError, setGlobalError] = useState('')

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const { data } = await api.get('/loans/')
        // only loans for this borrower
        setLoans(data.filter(ln => ln.borrower === user.id))
      } catch (err) {
        setGlobalError('Unable to load your loans.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchLoans()
  }, [user.id])

  const handleChange = (loanId, value) => {
    setAmounts(prev => ({ ...prev, [loanId]: value }))
    setErrors(prev => ({ ...prev, [loanId]: '' }))
    setSuccesses(prev => ({ ...prev, [loanId]: '' }))
  }

  const handleRepay = async loanId => {
    const amount = parseFloat(amounts[loanId])
    if (!amount || amount <= 0) {
      setErrors(prev => ({ ...prev, [loanId]: 'Enter a valid amount.' }))
      return
    }

    try {
      await api.post('/repayments/', {
        loan: loanId,
        amount_paid: amount
      })
      setSuccesses(prev => ({
        ...prev,
        [loanId]: 'Repayment recorded.'
      }))
      setAmounts(prev => ({ ...prev, [loanId]: '' }))
      // optionally re-fetch loan to get updated totals:
      // const updated = await api.get(/loans/LSL{loanId}/)
      // setLoans(loans.map(l => l.id===loanId?updated.data:l))
    } catch (err) {
      console.error(err)
      setErrors(prev => ({
        ...prev,
        [loanId]: err.response?.data?.detail || 'Failed to record repayment.'
      }))
    }
  }

  if (loading) return <p>Loading your loans…</p>
  if (globalError) return <div className="alert alert-danger">{globalError}</div>
  if (!loans.length) return <p>You have no loans to repay.</p>

  return (
    <div>
      <h2 className="mb-4">Make a Repayment</h2>
      {loans.map(loan => (
        <div key={loan.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              Loan #{loan.id}: {loan.amount} @ {loan.interest_rate}% for{' '}
              {loan.term_months} mo
            </h5>

            {/* STATUS & COMPUTED PROPERTIES */}
            <p className="card-text">
              <strong>Status:</strong>{' '}
              <span
                className={
                  loan.status === 'pending'
                    ? 'badge bg-warning text-dark'
                    : loan.status === 'approved'
                    ? 'badge bg-success'
                    : 'badge bg-danger'
                }
              >
                {loan.status}
              </span>
            </p>
            <p className="card-text">
              <strong>Total Repaid:</strong> {loan.total_repaid}
            </p>
            <p className="card-text">
              <strong>Remaining Balance:</strong> {loan.remaining_balance}
            </p>
            <p className="card-text">
              <strong>Fully Repaid:</strong>{' '}
              {loan.is_fully_repaid ? 'Yes' : 'No'}
            </p>

            {/* REPAYMENT INPUT */}
           
          </div>
        </div>
      ))}
    </div>
  )
}