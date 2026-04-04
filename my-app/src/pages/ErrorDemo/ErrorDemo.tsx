import { useAppDispatch } from '../../app/hooks';
import { setError, openModal } from '../../store/settingsSlice';

const ErrorDemo = () => {
  const dispatch = useAppDispatch();

  const handleShowError = () => {
    dispatch(setError('Это тестовая ошибка, вызванная пользователем. AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'));
    dispatch(openModal());
  };

  return (
    <div>
      <h2>Демонстрация модальной ошибки</h2>
      <button onClick={handleShowError}>Показать модальное окно c ошибкой</button>
    </div>
  );
};

export default ErrorDemo;