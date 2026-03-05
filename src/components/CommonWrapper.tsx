import { ReactNode } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { closeModal } from '../store/settingsSlice'
import Navbar from './Navbar'
import Loader from '../ui/Loader'

interface Props {
  children: ReactNode
}

const CommonWrapper = ({ children }: Props) => {
  const dispatch = useAppDispatch()

  const { isLoading, error, modalState } = useAppSelector(
    (state) => state.settings
  )

  return (
    <>
      {/* НАВИГАЦИЯ */}
      <Navbar />

      {/* LOADER */}
      {isLoading && <Loader />}

      {/* МОДАЛКА ОШИБКИ */}
      {modalState && error && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ background: 'white', padding: 20 }}>
            <p>{error}</p>
            <button onClick={() => dispatch(closeModal())}>
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* ОСНОВНОЙ КОНТЕНТ */}
      {children}
    </>
  )
}

export default CommonWrapper