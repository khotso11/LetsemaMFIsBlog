// import { useState } from 'react'
// import api from '../api/loan'


// export default function ApplyLoan() {
//   const [form, setForm] = useState({
//     amount: '',
//     interest_rate: '',
//     term_months: '',
//     status: 'pending',              // default
//     national_id_document: null,     // file
//     proof_of_payment: null,         // file
//   })
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')

//   const handleChange = e => {
//     const { name, type, value, files } = e.target
//     if (type === 'file') {
//       setForm(prev => ({ ...prev, [name]: files[0] }))
//     } else {
//       setForm(prev => ({ ...prev, [name]: value }))
//     }
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     setError('')
//     setSuccess('')

//     try {
//       const data = new FormData()
//       data.append('amount', form.amount)
//       data.append('interest_rate', form.interest_rate)
//       data.append('term_months', form.term_months)
//       data.append('status', form.status)
//       if (form.national_id_document) {
//         data.append('national_id_document', form.national_id_document)
//       }
//       if (form.proof_of_payment) {
//         data.append('proof_of_payment', form.proof_of_payment)
//       }

//       await api.post(
//         '/loans/',
//         data,
//         { headers: { 'Content-Type': 'multipart/form-data' } }
//       )

//       setSuccess('Loan application submitted successfully.')
//       setForm({
//         amount: '',
//         interest_rate: '',
//         term_months: '',
//         status: 'pending',
//         national_id_document: null,
//         proof_of_payment: null,
//       })
//     } catch (err) {
//       setError(
//         err.response?.data?.detail ||
//         'Failed to submit loan application.'
//       )
//     }
//   }

//   return (
//     <div className="row justify-content-center">
//       <div className="col-md-6">
//         <h2 className="mb-4 text-center">Apply for a Loan</h2>

//         {error && <div className="alert alert-danger">{error}</div>}
//         {success && <div className="alert alert-success">{success}</div>}

      //   <form onSubmit={handleSubmit} encType="multipart/form-data">
      //     <div className="mb-3">
      //       <label className="form-label">Amount</label>
      //       <input
      //         type="number"
      //         name="amount"
      //         className="form-control"
      //         value={form.amount}
      //         onChange={handleChange}
      //         required
      //       />
      //     </div>

      //     <div className="mb-3">
      //       <label className="form-label">Interest Rate (%)</label>
      //       <input
      //         type="number"
      //         step="0.01"
      //         name="interest_rate"
      //         className="form-control"
      //         value={form.interest_rate}
      //         onChange={handleChange}
      //         required
      //       />
      //     </div>

      //     <div className="mb-3">
      //       <label className="form-label">Term (months)</label>
      //       <input
      //         type="number"
      //         name="term_months"
      //         className="form-control"
      //         value={form.term_months}
      //         onChange={handleChange}
      //         required
      //       />
      //     </div>

      //     {/* status is hidden since default is 'pending' */}
      //     <input type="hidden" name="status" value={form.status} />

      //     <div className="mb-3">
      //       <label className="form-label">National ID Document</label>
      //       <input
      //         type="file"
      //         name="national_id_document"
      //         className="form-control"
      //         onChange={handleChange}
      //       />
      //     </div>

      //     <div className="mb-4">
      //       <label className="form-label">Proof of Payment</label>
      //       <input
      //         type="file"
      //         name="proof_of_payment"
      //         className="form-control"
      //         onChange={handleChange}
      //       />
      //     </div>

      //     <button type="submit" className="btn btn-primary w-100">
      //       Submit Application
      //     </button>
      //   </form>
      // </div>
//     </div>
//   )
// }



import { useState } from 'react'
import api from '../api/loan'

export default function ApplyLoan() {
  const [form, setForm] = useState({
    amount: '',
    interest_rate: '',
    term_months: '',
    status: 'pending',
    national_id_document: null,
    proof_of_payment: null,
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = e => {
    const { name, type, value, files } = e.target
    if (type === 'file') {
      setForm(prev => ({ ...prev, [name]: files[0] }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const data = new FormData()
      data.append('amount', form.amount)
      data.append('interest_rate', form.interest_rate)
      data.append('term_months', form.term_months)
      data.append('status', form.status)
      if (form.national_id_document) {
        data.append('national_id_document', form.national_id_document)
      }
      if (form.proof_of_payment) {
        data.append('proof_of_payment', form.proof_of_payment)
      }

      await api.post(
        '/loans/',
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      setSuccess('Loan application submitted successfully.')
      setForm({
        amount: '',
        interest_rate: '',
        term_months: '',
        status: 'pending',
        national_id_document: null,
        proof_of_payment: null,
      })
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        'Failed to submit loan application.'
      )
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mb-4 text-center">Apply for a Loan</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              name="amount"
              className="form-control"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Interest Rate (%)</label>
            <input
              type="number"
              step="0.01"
              name="interest_rate"
              className="form-control"
              value={form.interest_rate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Term (months)</label>
            <input
              type="number"
              name="term_months"
              className="form-control"
              value={form.term_months}
              onChange={handleChange}
              required
            />
          </div>

          <input type="hidden" name="status" value={form.status} />

          <div className="mb-3">
            <label className="form-label">National ID Document</label>
            <input
              type="file"
              name="national_id_document"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Proof of Payment</label>
            <input
              type="file"
              name="proof_of_payment"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  )
}
