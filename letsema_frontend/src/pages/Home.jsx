// import { FaUsers, FaMoneyBillWave, FaExchangeAlt, FaChartLine } from 'react-icons/fa'

// // Dashboard home page with summary cards and charts
// const Home = () => {
//   // Sample data for dashboard
//   const stats = [
//     { title: 'Active Borrowers', value: '1,245', icon: <FaUsers />, color: 'primary' },
//     { title: 'Total Loans', value: 'LSL2.3M', icon: <FaMoneyBillWave />, color: 'success' },
//     { title: 'Transactions Today', value: '156', icon: <FaExchangeAlt />, color: 'info' },
//     { title: 'Repayment Rate', value: '94.2%', icon: <FaChartLine />, color: 'warning' }
//   ]
  
//   return (
//     <div className="dashboard-home">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Dashboard Overview</h2>
//         <div>
//           <button className="btn btn-primary me-2">
//             <FaMoneyBillWave className="me-2" />
//             New Loan
//           </button>
//           <button className="btn btn-secondary">
//             <FaUsers className="me-2" />
//             Add Borrower
//           </button>
//         </div>
//       </div>
      
//       {/* Stats Cards */}
//       <div className="row">
//         {stats.map((stat, index) => (
//           <div className="col-md-6 col-lg-3" key={index}>
//             <div className={`card border-${stat.color} mb-4`}>
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-1">{stat.title}</h6>
//                     <h3 className="mb-0">{stat.value}</h3>
//                   </div>
//                   <div className={`bg-${stat.color} bg-opacity-10 p-3 rounded`}>
//                     {stat.icon}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {/* Recent Activity and Charts */}
//       <div className="row">
//         <div className="col-lg-8">
//           <div className="card">
//             <div className="card-header d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">Loan Performance</h5>
//               <div className="btn-group">
//                 <button className="btn btn-sm btn-outline-secondary">Weekly</button>
//                 <button className="btn btn-sm btn-outline-secondary active">Monthly</button>
//                 <button className="btn btn-sm btn-outline-secondary">Yearly</button>
//               </div>
//             </div>
//             <div className="card-body">
//               {/* Placeholder for chart */}
//               <div className="bg-light p-5 text-center rounded">
//                 <p className="mb-0">Loan Performance Chart</p>
//                 <p className="text-muted small">(Chart visualization would go here)</p>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="col-lg-4">
//           <div className="card">
//             <div className="card-header">
//               <h5 className="mb-0">Recent Activities</h5>
//             </div>
//             <div className="card-body p-0">
//               <ul className="list-group list-group-flush">
//                 <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                   <div>
//                     <p className="mb-0 fw-bold">Loan Disbursed</p>
//                     <p className="text-muted small mb-0">To: Maria Johnson</p>
//                   </div>
//                   <div className="text-end">
//                     <span className="badge bg-success">LSL2,500</span>
//                     <p className="text-muted small mb-0">Today, 10:45 AM</p>
//                   </div>
//                 </li>
//                 <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                   <div>
//                     <p className="mb-0 fw-bold">Payment Received</p>
//                     <p className="text-muted small mb-0">From: John Smith</p>
//                   </div>
//                   <div className="text-end">
//                     <span className="badge bg-primary">LSL350</span>
//                     <p className="text-muted small mb-0">Today, 9:30 AM</p>
//                   </div>
//                 </li>
//                 <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                   <div>
//                     <p className="mb-0 fw-bold">New Borrower</p>
//                     <p className="text-muted small mb-0">David Wilson</p>
//                   </div>
//                   <div className="text-end">
//                     <span className="badge bg-info">Registered</span>
//                     <p className="text-muted small mb-0">Yesterday, 3:15 PM</p>
//                   </div>
//                 </li>
//                 <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                   <div>
//                     <p className="mb-0 fw-bold">Loan Application</p>
//                     <p className="text-muted small mb-0">From: Sarah Adams</p>
//                   </div>
//                   <div className="text-end">
//                     <span className="badge bg-warning">Pending</span>
//                     <p className="text-muted small mb-0">Yesterday, 1:20 PM</p>
//                   </div>
//                 </li>
//               </ul>
//             </div>
//             <div className="card-footer text-center">
//               <a href="#" className="text-decoration-none">View All Activities</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Home


import { FaUsers, FaMoneyBillWave, FaExchangeAlt, FaChartLine, FaCalendarAlt, FaFileInvoiceDollar, FaExclamationTriangle } from 'react-icons/fa'

// Dashboard home page with role-based UI
const Home = () => {
  const raw = localStorage.getItem('user')
  const user = raw ? JSON.parse(raw) : null
  const role = user?.role

  // Admin stats
  const adminStats = [
    { title: 'Active Borrowers', value: '1,245', icon: <FaUsers />, color: 'primary' },
    { title: 'Total Loans', value: 'LSL2.3M', icon: <FaMoneyBillWave />, color: 'success' },
    { title: 'Transactions Today', value: '156', icon: <FaExchangeAlt />, color: 'info' },
    { title: 'Repayment Rate', value: '94.2%', icon: <FaChartLine />, color: 'warning' }
  ]

  // Borrower stats
  const borrowerStats = [
    { title: 'Your Outstanding Balance', value: 'LSL1,200.50', icon: <FaMoneyBillWave /> },
    { title: 'Next Due Date', value: 'May 15, 2025', icon: <FaCalendarAlt /> },
    { title: 'Total Repaid', value: 'LSL3,450.00', icon: <FaFileInvoiceDollar /> },
    { title: 'Overdue Amount', value: 'LSL0.00', icon: <FaExclamationTriangle /> }
  ]

  return (
    <div className="dashboard-home">
      {role === 'borrower' ? (
        <>  {/* Borrower View */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Welcome, {user?.first_name || 'Borrower'}</h2>
          </div>
          <div className="row">
            {borrowerStats.map((stat, index) => (
              <div className="col-md-6 col-lg-3 mb-4" key={index}>
                <div className="card border-secondary">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-1">{stat.title}</h6>
                      <h4 className="mb-0">{stat.value}</h4>
                    </div>
                    <div className="fs-2 text-secondary">{stat.icon}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex gap-3">
            <button className="btn btn-primary">
              <FaMoneyBillWave className="me-2" /> View My Loans
            </button>
            <button className="btn btn-outline-primary">
              <FaFileInvoiceDollar className="me-2" /> Make a Payment
            </button>
          </div>
        </>
      ) : (
        <>  {/* Admin View */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Dashboard Overview</h2>
            <div>
              <button className="btn btn-primary me-2">
                <FaMoneyBillWave className="me-2" /> New Loan
              </button>
              <button className="btn btn-secondary">
                <FaUsers className="me-2" /> Add Borrower
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row">
            {adminStats.map((stat, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className={`card border-${stat.color} mb-4`}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted mb-1">{stat.title}</h6>
                        <h3 className="mb-0">{stat.value}</h3>
                      </div>
                      <div className={`bg-${stat.color} bg-opacity-10 p-3 rounded`}>
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity and Charts */}
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Loan Performance</h5>
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline-secondary">Weekly</button>
                    <button className="btn btn-sm btn-outline-secondary active">Monthly</button>
                    <button className="btn btn-sm btn-outline-secondary">Yearly</button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="bg-light p-5 text-center rounded">
                    <p className="mb-0">Loan Performance Chart</p>
                    <p className="text-muted small">(Chart visualization would go here)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Recent Activities</h5>
                </div>
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <div>
                        <p className="mb-0 fw-bold">Loan Disbursed</p>
                        <p className="text-muted small mb-0">To: Maria Johnson</p>
                      </div>
                      <div className="text-end">
                        <span className="badge bg-success">LSL2,500</span>
                        <p className="text-muted small mb-0">Today, 10:45 AM</p>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <div>
                        <p className="mb-0 fw-bold">Payment Received</p>
                        <p className="text-muted small mb-0">From: John Smith</p>
                      </div>
                      <div className="text-end">
                        <span className="badge bg-primary">LSL350</span>
                        <p className="text-muted small mb-0">Today, 9:30 AM</p>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <div>
                        <p className="mb-0 fw-bold">New Borrower</p>
                        <p className="text-muted small mb-0">David Wilson</p>
                      </div>
                      <div className="text-end">
                        <span className="badge bg-info">Registered</span>
                        <p className="text-muted small mb-0">Yesterday, 3:15 PM</p>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <div>
                        <p className="mb-0 fw-bold">Loan Application</p>
                        <p className="text-muted small mb-0">From: Sarah Adams</p>
                      </div>
                      <div className="text-end">
                        <span className="badge bg-warning">Pending</span>
                        <p className="text-muted small mb-0">Yesterday, 1:20 PM</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="card-footer text-center">
                  <a href="#" className="text-decoration-none">View All Activities</a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
