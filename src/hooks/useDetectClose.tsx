import {
  useEffect,
  useState,
  RefObject,
  Dispatch,
  SetStateAction,
} from 'react';

const useDetectClose = (
  ref: RefObject<HTMLDivElement>,
  initialState: boolean
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const handleClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isOpen, ref]);

  return [isOpen, setIsOpen];
};

export default useDetectClose;
