import { useAppDispatch } from '../../app/hooks';
import { setLoading } from '../../store/settingsSlice';

const LoaderDemo = () => {
  const dispatch = useAppDispatch();

  const handleShowLoader = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 3000);
  };

  return (
    <div>
      <h2>Демонстрация лоадера</h2>
      <button onClick={handleShowLoader}>Показать кружок загрузки на 3 секунды</button>
    </div>
  );
};

export default LoaderDemo;