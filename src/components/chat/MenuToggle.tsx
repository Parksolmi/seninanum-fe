import { motion, SVGMotionProps, Variants } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

// PathProps 정의: SVGMotionProps<SVGPathElement>와 Variants 타입 포함
interface PathProps extends SVGMotionProps<SVGPathElement> {
  d: string;
  variants: Variants;
  initial: boolean | string;
  animate: string;
  transition: object;
}

// Path 컴포넌트
const Path = ({ ...props }: PathProps): React.JSX.Element => (
  <motion.path
    fill="none"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  />
);

export const MenuToggle = ({
  toggle,
  isOpen,
}: {
  toggle: () => void;
  isOpen: boolean;
}): React.JSX.Element => (
  <WrapButton onClick={toggle}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <Path
        d="M 2 14 L 26 14" // 수평선
        variants={{
          closed: { d: 'M 2 14 L 26 14', stroke: '#5B5B5B' },
          open: { d: 'M 2 14 L 26 14', rotate: 45, stroke: '#5B5B5B' },
        }}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3 }}
      />
      <Path
        d="M 14 2 L 14 26.5" // 수직선
        variants={{
          closed: { d: 'M 14 2 L 14 26.5', stroke: '#5B5B5B' },
          open: { d: 'M 14 2 L 14 26.5', rotate: 45, stroke: '#5B5B5B' },
        }}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3 }}
      />
    </svg>
  </WrapButton>
);

const WrapButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
`;
