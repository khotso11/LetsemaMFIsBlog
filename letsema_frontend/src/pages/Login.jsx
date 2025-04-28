// import { useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import api from '../api/client'

// export default function Login() {
//   const [creds, setCreds] = useState({ email: '', password: '' })
//   const [error, setError] = useState('')
//   const navigate = useNavigate()

//   const handleChange = e => {
//     setCreds(prev => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     setError('')
//     try {
//       const { data } = await api.post('/login/', creds)
      
//       // <-- Log the full response and user data
//       console.log('Login response:', data)
//       console.log('Logged-in user:', data.user)

//       localStorage.setItem('access', data.access)
//       localStorage.setItem('refresh', data.refresh)
//       localStorage.setItem('user', JSON.stringify(data.user))
      
//       navigate('/')
//     } catch {
//       setError('Invalid email or password')
//     }
//   }

//   return (
//     <div className="row justify-content-center">
//       <div className="col-md-5">
//         <h2 className="mb-4 text-center">Log In</h2>
//         {error && <div className="alert alert-danger">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input
//               type="email"
//               name="email"
//               className="form-control"
//               value={creds.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               value={creds.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary w-100">
//             Log In
//           </button>
//         </form>

//         <p className="mt-3 text-center">
//           Don't have an account? <Link to="/register">Register</Link>
//         </p>
//       </div>
//     </div>
//   )
// }

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaUser, FaLock } from 'react-icons/fa'
import api from '../api/loan'  // baseURL = http://<subdomain>:8000/api

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password')
      return
    }

    setLoading(true)
    try {
      const { data } = await api.post('/users/login/', credentials)
      console.log('Login response:', data)
      console.log('Logged-in user:', data.user)

      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)
      localStorage.setItem('user', JSON.stringify(data.user))

      navigate('/')
    } catch (err) {
      console.error('Login error:', err)
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h3 className="mb-1">Microfinance</h3>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaUser /></span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="password" className="form-label">Password</label>
                      <Link to="#" className="text-decoration-none small">Forgot password?</Link>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text"><FaLock /></span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-decoration-none">
                      Create an account
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

export default Login
