import type { JSX } from 'react';

import clsx from 'clsx';
import React from 'react';

import styles from './Input.module.css';

type InputProps<
  Component extends React.JSXElementConstructor<any> | keyof JSX.IntrinsicElements = 'input'
> = {
  label?: string;
  component?: Component;
} & React.ComponentProps<Component>;

// eslint-disable-next-line react/no-forward-ref, siberiacancode-react/display-name
export const Input = React.forwardRef(
  (
    { label, className, component, ...props }: InputProps<'input'>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const id = React.useId();
    const Component = component ?? 'input'

    return (
      <div className={styles.container}>
        {label && (
          <label className='paragraph14-regular' htmlFor={id}>
            {label}
          </label>
        )}
        <Component
          className={clsx(styles.input, 'paragraph16-regular', className)}
          id={id}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
) as <Component extends React.JSXElementConstructor<any> | keyof JSX.IntrinsicElements = 'input'>(
  props: InputProps<Component> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => React.ReactElement;

