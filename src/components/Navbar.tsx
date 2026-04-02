import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { logout } from '../store/userSlice'
import styles from './Navbar.module.css';

const Navbar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className={styles.navbar}>
      <Link to="/">Главная</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">Профиль</Link>
      <Link to="/register">Регистрация</Link>
      <Link to="/albums">Альбомы</Link>
      <Link to="/loader-demo">Тест лоадера</Link>
      <Link to="/error-demo">Тест ошибки</Link>

      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  )
}

export default Navbar