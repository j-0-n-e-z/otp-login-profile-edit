import { Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { Button, Input, Typography } from '@/components';

import { useOtpForm } from './hooks/useOtpForm';

import styles from './OtpForm.module.css';

export const OtpForm = () => {
  const { form, state, functions } = useOtpForm();

  return (
    <form className={styles.container} onSubmit={functions.onSubmit}>
      <Typography tag='p' variant='paragraph16-regular'>
        Введите номер телефона для входа
        <br /> в личный кабинет
      </Typography>

      <Controller
        render={({ field: { onChange, ...rest }, fieldState }) => (
          <Input
            {...rest}
            disabled={state.isLoading}
            component={PatternFormat}
            format='+7 (###) ### ## ##'
            placeholder='Телефон'
            {...(fieldState.error && { error: fieldState.error.message })}
          />
        )}
        name='phone'
        control={form.control}
      />

      <Button type='submit' variant='contained' loading={state.isLoading}>
        Войти
      </Button>
    </form>
  );
};
