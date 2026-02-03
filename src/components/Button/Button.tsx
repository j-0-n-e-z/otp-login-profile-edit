import clsx from 'clsx';
import React from 'react';

import preloader from '../../assets/icons/preloading.svg';

import styles from './Button.module.css';

type ButtonVariant = 'contained' | 'outlined';

interface ButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  loading?: boolean;
  variant?: ButtonVariant;
}

// eslint-disable-next-line react/no-forward-ref, siberiacancode-react/display-name
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'contained', className, loading, ...props }, ref) => (
    <button
      className={clsx(styles.button, styles[variant], className)}
      type='button'
      {...props}
      ref={ref}
    >
      {loading ? <img alt='Loading...' src={preloader} /> : <>{children}</>}
    </button>
  )
);
