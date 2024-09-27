import { useModalState } from '../store/modalState'; // 상태를 가져올 custom hook을 사용

const GlobalModalContainer = () => {
  const modal = useModalState((state) => state.modal);
  return modal || null;
};

export default GlobalModalContainer;
