import { Routes, Route } from 'react-router-dom'

import Landing from '../pages/Landing/Landing'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Profile from '../pages/Profile/Profile'
import Dashboard from '../pages/Dashboard/Dashboard'
import NotFound from '../pages/NotFound/NotFound'
import LoaderDemo from '../pages/LoaderDemo/LoaderDemo';
import ErrorDemo from '../pages/ErrorDemo/ErrorDemo';


import AuthWrapper from '../components/AuthWrapper'
import CommonWrapper from '../components/CommonWrapper'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CommonWrapper><Landing /></CommonWrapper>} />
      <Route path="/login" element={<CommonWrapper><Login /></CommonWrapper>} />
      <Route path="/register" element={<CommonWrapper><Register /></CommonWrapper>} />

      <Route
        path="/profile"
        element={
          <AuthWrapper>
            <CommonWrapper>
              <Profile />
            </CommonWrapper>
          </AuthWrapper>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthWrapper>
            <CommonWrapper>
              <Dashboard />
            </CommonWrapper>
          </AuthWrapper>
        }
      />
      <Route
        path="/loader-demo"
        element={
          <AuthWrapper>
            <CommonWrapper>
              <LoaderDemo />
            </CommonWrapper>
          </AuthWrapper>
        }
      />
      <Route
        path="/error-demo"
        element={
          <AuthWrapper>
            <CommonWrapper>
              <ErrorDemo />
            </CommonWrapper>
          </AuthWrapper>
        }
      />

      <Route path="*" element={<CommonWrapper><NotFound /></CommonWrapper>} />
    </Routes>
  )
}

export default AppRouter