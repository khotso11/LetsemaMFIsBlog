import { useEffect, useState } from 'react'
import api from '../api/loan'  // or '../api/client'

export default function Borrowers() {
  const [loans, setLoans]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  // Fetch only approved loans, including borrower_details
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
            </tr>
          </thead>
          <tbody>
            {loans.map(loan => {
              const borrower = loan.borrower_details || {}
              const fullName = borrower.first_name
                ? `${borrower.first_name} ${borrower.last_name}`.trim()
                : '—'
              return (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td>{fullName}</td>
                  <td>{borrower.email || '—'}</td>
                  <td>{loan.amount}</td>
                  <td>{loan.interest_rate}%</td>
                  <td>{loan.term_months} mo</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
