import React from 'react';
import { styled } from './stitches.config';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ContainerBody = styled('div', {
  backgroundColor: '$background',
  color: '$textPrimary',
  width: '100%',
  height: '100%',
});

function GlobalDiv({ children, className }: Props) {
  return <ContainerBody className={className || ''}>{children}</ContainerBody>;
}

GlobalDiv.defaultProps = {
  className: '',
};

export { GlobalDiv };
