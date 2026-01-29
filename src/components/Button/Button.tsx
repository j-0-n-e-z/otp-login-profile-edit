import clsx from 'clsx';
import React from 'react';

import styles from './Button.module.css';

type ButtonVariant = 'contained' | 'outlined';

interface ButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  variant: ButtonVariant;
}

export const Button = ({
  ref,
  children,
  variant,
  className,
  ...props
}: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      type='button'
      {...props}
      ref={ref}
    >
      {children}
    </button>
  );
};
