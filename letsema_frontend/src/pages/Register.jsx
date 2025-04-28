import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaIdCard
} from 'react-icons/fa'
import api from '../api/client'   // baseURL → http://<host>:8000/api/users

export default function Register() {
  const [form, setForm]     = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
    national_id: ''
  })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      // POST to /api/users/register/
      await api.post('/register/', form)
      navigate('/login')
    } catch (err) {
      console.error('Registration error:', err)
      setError(
        err.response?.data?.detail ||
        Object.values(err.response?.data || {}).flat()[0] ||
        'Registration failed'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h3 className="mb-1">Microfinance</h3>
                  <p className="text-muted">Create a new account</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="first_name" className="form-label">
                        First Name
                      </label>
                      <div className="input-group">
                        <span className="input-group-text"><FaUser /></span>
                        <input
                          type="text"
                          className="form-control"
                          id="first_name"
                          name="first_name"
                          placeholder="Enter your first name"
                          value={form.first_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="last_name" className="form-label">
                        Last Name
                      </label>
                      <div className="input-group">
                        <span className="input-group-text"><FaUser /></span>
                        <input
                          type="text"
                          className="form-control"
                          id="last_name"
                          name="last_name"
                          placeholder="Enter your last name"
                          value={form.last_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaEnvelope /></span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaLock /></span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Create a password"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-text">
                      Password must be at least 8 characters long
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone_number" className="form-label">
                      Phone Number
                    </label>
                    <div className="input-group">
                      <span className="input-group-text"><FaPhone /></span>
                      <input
                        type="text"
                        className="form-control"
                        id="phone_number"
                        name="phone_number"
                        placeholder="Enter your phone number"
                        value={form.phone_number}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="national_id" className="form-label">
                      National ID
                    </label>
                    <div className="input-group">
                      <span className="input-group-text"><FaIdCard /></span>
                      <input
                        type="text"
                        className="form-control"
                        id="national_id"
                        name="national_id"
                        placeholder="Enter your national ID"
                        value={form.national_id}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Creating…' : 'Create Account'}
                    </button>
                  </div>
                </form>

                <div className="text-center mt-3">
                  <p className="text-muted mb-0">
                    Already have an account?{' '}
                    <Link to="/login" className="text-decoration-none">
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-3">
              <p className="text-muted small mb-0">
                &copy; {new Date().getFullYear()} Microfinance. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
