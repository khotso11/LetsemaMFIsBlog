import { useState } from 'react'
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaLock, FaCamera } from 'react-icons/fa'

const Profile = () => {
  const [user, setUser] = useState({
    id: 'U1001',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA',
    role: 'Loan Officer',
    joinDate: '2023-01-15'
  })
  
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({...user})
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically call your API to update the user profile
    setUser({...formData})
    setIsEditing(false)
    alert('Profile updated successfully!')
  }
  
  const handleCancel = () => {
    setFormData({...user})
    setIsEditing(false)
  }
  
  return (
    <div className="profile-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Profile</h2>
        {!isEditing && (
          <button 
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
      
      <div className="row">
        <div className="col-md-4 mb-4 mb-md-0">
          <div className="card">
            <div className="card-body text-center">
              <div className="position-relative d-inline-block mb-3">
                <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '150px', height: '150px', fontSize: '4rem' }}>
                  <FaUser className="text-secondary" />
                </div>
                <button className="btn btn-sm btn-primary position-absolute bottom-0 end-0 rounded-circle p-2">
                  <FaCamera />
                </button>
              </div>
              <h4>{user.firstName} {user.lastName}</h4>
              <p className="text-muted mb-1">{user.role}</p>
              <p className="text-muted">Member since {user.joinDate}</p>
              
              <div className="d-grid gap-2 mt-4">
                <button className="btn btn-outline-primary">
                  <FaLock className="me-2" />
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Profile Information</h5>
            </div>
            <div className="card-body">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <div className="input-group">
                        <span className="input-group-text"><FaUser /></span>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="firstName" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <div className="input-group">
                        <span className="input-group-text"><FaUser /></span>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="lastName" 
                          name="lastName"
                          value={formData.lastName}
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
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaPhone /></span>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaIdCard /></span>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="address" 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-end gap-2">
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0 fw-bold">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.firstName} {user.lastName}</p>
                  </div>
                  
                  <div className="col-sm-3">
                    <p className="mb-0 fw-bold">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.email}</p>
                  </div>
                  
                  <div className="col-sm-3">
                    <p className="mb-0 fw-bold">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.phone}</p>
                  </div>
                  
                  <div className="col-sm-3">
                    <p className="mb-0 fw-bold">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.address}</p>
                  </div>
                  
                  <div className="col-sm-3">
                    <p className="mb-0 fw-bold">Role</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.role}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="card mt-4">
            <div className="card-header">
              <h5 className="mb-0">Account Activity</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Activity</th>
                      <th>Date</th>
                      <th>IP Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Login</td>
                      <td>2023-05-15 09:30 AM</td>
                      <td>192.168.1.1</td>
                    </tr>
                    <tr>
                      <td>Password Changed</td>
                      <td>2023-05-10 02:15 PM</td>
                      <td>192.168.1.1</td>
                    </tr>
                    <tr>
                      <td>Profile Updated</td>
                      <td>2023-05-05 11:45 AM</td>
                      <td>192.168.1.1</td>
                    </tr>
                    <tr>
                      <td>Login</td>
                      <td>2023-05-01 10:20 AM</td>
                      <td>192.168.1.1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile