import type { ReactNode } from 'react'
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
      <Navbar />

      {isLoading && <Loader />}

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
          <div style={{ background: 'white', padding: 20, color: 'black' }}>
            <p>{error}</p>
            <button onClick={() => dispatch(closeModal())}>
              Закрыть
            </button>
          </div>
        </div>
      )}

      {children}
    </>
  )
}

export default CommonWrapper