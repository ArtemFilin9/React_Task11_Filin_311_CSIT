import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import type { RootState } from '../app/store'

interface Props {
  children: ReactNode
}

const AuthWrapper = ({ children }: Props) => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth)

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default AuthWrapper