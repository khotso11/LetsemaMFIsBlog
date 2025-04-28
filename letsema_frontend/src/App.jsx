// import { Routes, Route, Navigate } from 'react-router-dom'
// import Login     from './pages/Login'
// import Register  from './pages/Register'
// import Dashboard from './pages/Dashboard'
// import PrivateRoute from './components/PrivateRoute'
// import ApplyLoan from './pages/ApplyLoan'
// import ViewLoans from './pages/ViewLoans'
// import MfiLoans from './pages/MfiLoans'
// import Repayments from './pages/Repayments'
// import MyRepayments from './pages/MyRepayments'



// export default function App() {
//   return (
//     <div className="container py-4">
//       <Routes>
//         <Route path="/login"    element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/apply-loan" element={<ApplyLoan />} />
//         <Route path="/view-loans" element={<ViewLoans />} />
//         <Route path="/mfi-loans" element={<MfiLoans />} />
//         <Route path="/repayments" element={<Repayments />} />
//         <Route path="/my-repayments" element={<MyRepayments />} />
//         <Route
//           path="/"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//               <ApplyLoan />
//               <ViewLoans />
//               <MfiLoans />
//               <Repayments />
//               <MyRepayments />
//             </PrivateRoute>
//           }
//         />
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </div>
//   )
// }

import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home'
import ApplyLoan from './pages/ApplyLoan'
import Repayments from './pages/Repayments'
import ViewLoans from './pages/ViewLoans'
import Borrowers from './pages/Borrowers'
import Loans from './pages/Loans'
import Users from './pages/Users'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import MyRepayments from './pages/MyRepayments'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="apply-loan" element={<ApplyLoan />} />
        <Route path="repayments" element={<Repayments />} />
        <Route path="view-loans" element={<ViewLoans />} />
        <Route path="borrowers" element={<Borrowers />} />
        <Route path="loans" element={<Loans />} />
        <Route path="users" element={<Users />} />
        <Route path="profile" element={<Profile />} />
        <Route path="my-repayments" element={<MyRepayments />} />
      </Route>
      <Route
        path="*"
        element={
          <PrivateRoute>
            <DashboardLayout />
            <MyRepayments />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App