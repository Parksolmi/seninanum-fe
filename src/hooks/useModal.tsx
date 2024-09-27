import { useModalState } from '../store/modalState';

/**
 * @param {function} modal - 모달 JSX를 반환하는 함수
 */

const useModal = (modal) => {
  const { setModal } = useModalState();

  const openModal = (id?) => {
    setModal(modal(id));
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModal(null);
    document.body.style.overflow = 'auto';
  };

  return { openModal, closeModal };
};

export default useModal;
