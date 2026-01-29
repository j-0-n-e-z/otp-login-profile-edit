import clsx from 'clsx';

import styles from './Button.module.css';

type ButtonVariant = 'contained' | 'outlined';

interface ButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  variant: ButtonVariant;
}

export const Button = ({ children, variant, className, ...props }: ButtonProps) => {
  return (
    <button className={clsx(styles.button, styles[variant], className)} type='button' {...props}>
      {children}
    </button>
  );
};
