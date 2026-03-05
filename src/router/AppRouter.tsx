import { Routes, Route } from 'react-router-dom'

import Landing from '../pages/Landing/Landing'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Profile from '../pages/Profile/Profile'
import Dashboard from '../pages/Dashboard/Dashboard'
import Page1 from '../pages/Page1/Page1'
import Page2 from '../pages/Page2/Page2'
import Page3 from '../pages/Page3/Page3'
import NotFound from '../pages/NotFound/NotFound'

import AuthWrapper from '../components/AuthWrapper'
import CommonWrapper from '../components/CommonWrapper'

const AppRouter = () => {
  return (
    <Routes>
      {/* ПУБЛИЧНЫЕ */}
      <Route path="/" element={<CommonWrapper><Landing /></CommonWrapper>} />
      <Route path="/login" element={<CommonWrapper><Login /></CommonWrapper>} />
      <Route path="/register" element={<CommonWrapper><Register /></CommonWrapper>} />

      {/* ЗАЩИЩЕННЫЕ */}
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
        path="/page1"
        element={
          <AuthWrapper>
            <CommonWrapper>
              <Page1 />
            </CommonWrapper>
          </AuthWrapper>
        }
      />

      <Route
        path="/page2"
        element={
          <AuthWrapper>
            <CommonWrapper>
              <Page2 />
            </CommonWrapper>
          </AuthWrapper>
        }
      />

      <Route
        path="/page3"
        element={
          <AuthWrapper>
            <CommonWrapper>
              <Page3 />
            </CommonWrapper>
          </AuthWrapper>
        }
      />

      {/* 404 */}
      <Route path="*" element={<CommonWrapper><NotFound /></CommonWrapper>} />
    </Routes>
  )
}

export default AppRouter