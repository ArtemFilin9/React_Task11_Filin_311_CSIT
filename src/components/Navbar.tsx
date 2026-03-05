import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { logout } from '../store/userSlice'

const Navbar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav style={{ display: 'flex', gap: '10px' }}>
      <Link to="/">Главная</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">Профиль</Link>

      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  )
}

export default Navbar