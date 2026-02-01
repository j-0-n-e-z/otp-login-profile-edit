import { Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { Button, Input, Typography } from '@/components';

import { useView } from './hooks/useView';

import styles from './View.module.css';

export const AuthView = () => {
  const { functions, form, state } = useView();

  return (
    <form className={styles.container} onSubmit={functions.onSubmit}>
      <Typography tag='h1' variant='title'>
        Вход
      </Typography>

      <Typography tag='p' variant='paragraph16-regular'>
        Введите {state.stage === 'phone' ? 'номер телефона' : 'проверочный код'} для входа
        <br /> в личный кабинет
      </Typography>

      <Controller
        render={({ field: { onChange, ...restField }, fieldState }) => (
          <Input
            {...restField}
            disabled={state.isLoading}
            autoComplete='tel'
            component={PatternFormat}
            format='+7 (###) ### ## ##'
            onValueChange={({ value }) => onChange(value)}
            placeholder='Телефон'
            {...(fieldState.error && { error: fieldState.error.message })}
          />
        )}
        name='phone'
        control={form.control}
      />

      {state.stage === 'otp' && (
        <Input
          disabled={state.isLoading}
          maxLength={6}
          placeholder='Проверочный код'
          {...form.register('otp')}
          {...('otp' in form.formState.errors &&
            form.formState.errors.otp && { error: form.formState.errors.otp.message })}
        />
      )}

      <Button
        disabled={state.isLoading}
        type='submit'
        variant='contained'
        loading={state.isLoading}
      >
        Войти
      </Button>
    </form>
  );
};
